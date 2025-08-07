import express from 'express';
import session from 'express-session';
import routes from './src/routes/index.js';
import pool from './src/config/database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware CORS
app.use(cors({
    origin: process.env.URL_FE || 'http://localhost:5173', // Cho phép frontend (Vite) truy cập
    credentials: true, // Cho phép gửi cookie nếu cần
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Tạo lại __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'modi-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false, // true nếu dùng HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60, // 1 giờ
        },
    })
);

// Route
app.use('/', routes);



// upload ảnh

// Tạo thư mục public/image nếu chưa tồn tại
const uploadDir = 'public/image';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình multer để lưu file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/image/');
    },
    filename: function (req, file, cb) {
        // Tạo tên file duy nhất: timestamp_originalname
        const uniqueName = Date.now() + '_' + file.originalname;
        cb(null, uniqueName);
    }
});

// Kiểm tra file upload (chỉ cho phép ảnh)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Chỉ cho phép upload file ảnh (JPEG, PNG, GIF, WebP)'), false);
    }
};

// Cấu hình multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Giới hạn 5MB
    },
    fileFilter: fileFilter
});

// Route upload single image
app.post('/api/upload', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'Không có file nào được upload'
            });
        }

        res.json({
            success: true,
            message: 'Upload ảnh thành công',
            data: {
                filename: req.file.filename,
                originalname: req.file.originalname,
                size: req.file.size,
                path: `/public/image/${req.file.filename}`,
                url: `http://localhost:${PORT}/image/${req.file.filename}`
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server: ' + error.message
        });
    }
});

// Route upload multiple images
app.post('/api/upload-multiple', upload.array('images', 10), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Không có file nào được upload'
            });
        }

        const fileData = req.files.map(file => ({
            filename: file.filename,
            originalname: file.originalname,
            size: file.size,
            path: `/public/image/${file.filename}`,
            url: `http://localhost:${PORT}/image/${file.filename}`
        }));

        res.json({
            success: true,
            message: `Upload ${req.files.length} ảnh thành công`,
            data: fileData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi server: ' + error.message
        });
    }
});

// Route lấy danh sách ảnh đã upload
app.get('/api/images', (req, res) => {
    try {
        const files = fs.readdirSync('public/image');
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });

        const images = imageFiles.map(file => ({
            filename: file,
            url: `http://localhost:${PORT}/image/${file}`,
            path: `/image/${file}`
        }));

        res.json({
            success: true,
            data: images
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách ảnh: ' + error.message
        });
    }
});


// lây ảnh theo tên
app.get('/api/images', (req, res) => {
    try {
        const { filename } = req.query;

        const files = fs.readdirSync('public/image');
        const imageFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });

        // Nếu có truyền ?filename=...
        if (filename) {
            const found = imageFiles.find(file => file === filename);
            if (!found) {
                return res.status(404).json({
                    success: false,
                    message: `Không tìm thấy ảnh với tên: ${filename}`
                });
            }

            return res.json({
                success: true,
                data: {
                    filename: found,
                    url: `http://localhost:${PORT}/image/${found}`,
                    path: `/image/${found}`
                }
            });
        }

        // Nếu không có filename → trả về toàn bộ danh sách ảnh
        const images = imageFiles.map(file => ({
            filename: file,
            url: `http://localhost:${PORT}/image/${file}`,
            path: `/image/${file}`
        }));

        res.json({
            success: true,
            data: images
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi lấy danh sách ảnh: ' + error.message
        });
    }
});



// Route xóa ảnh
app.delete('/api/delete/:filename', (req, res) => {
    try {
        const filename = req.params.filename;
        const filePath = path.join('public/image', filename);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            res.json({
                success: true,
                message: 'Xóa ảnh thành công'
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Không tìm thấy file'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lỗi khi xóa ảnh: ' + error.message
        });
    }
});


// Error handling middleware
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File quá lớn. Kích thước tối đa 5MB'
            });
        }
    }

    res.status(500).json({
        success: false,
        message: error.message
    });
});


async function startServer() {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Kết nối database thành công!');
    } catch (err) {
        console.error('Kết nối database thất bại:', err.message);
        process.exit(1);
    } finally {
        if (connection) {
            connection.release();
        }
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Express server running at http://localhost:${PORT}/`);
    });
}

startServer();