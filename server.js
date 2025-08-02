import express from 'express';
import session from 'express-session';
import routes from './src/routes/index.js';
import pool from './src/config/database.js';
import requireAdminAuth from './src/middlewares/adminAuth.js';
import cors from 'cors'; // Import cors
import dotenv from 'dotenv';

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

// Session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'modi-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: {
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