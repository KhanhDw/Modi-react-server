import express from 'express';
import session from 'express-session';
import routes from './src/routes/index.js';
import pool from './src/config/database.js';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = 3000;

// Middleware CORS
app.use(cors({
    origin: 'http://localhost:5173', // Cho phép frontend (Vite) truy cập
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

    app.listen(port, '0.0.0.0', () => {
        console.log(`Express server running at http://localhost:${port}/`);
    });
}

startServer();