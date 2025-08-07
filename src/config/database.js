import mysql from 'mysql2/promise';
import fs from 'fs'; // Dùng để đọc file ca.pem nếu chạy local
import dotenv from 'dotenv';
dotenv.config();

// Tạo pool kết nối với Aiven MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.LOCAL_DB_HOST,
    port: process.env.DB_PORT || process.env.LOCAL_DB_PORT,
    user: process.env.DB_USER || process.env.LOCAL_DB_USER,
    password: process.env.DB_PASSWORD || process.env.LOCAL_DB_PASSWORD,
    database: process.env.DB_NAME || process.env.LOCAL_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        // Dùng cho chạy local, nếu triển khai trên Render thì bỏ hoặc đặt ssl: true
        ca: process.env.NODE_ENV === 'production' ? process.env.MYSQL_SSL_CA : fs.readFileSync('./Cert/ca.pem'),
        rejectUnauthorized: false
    }
});

// Kiểm tra kết nối
async function testConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Kết nối database thành công!');
        connection.release();
    } catch (err) {
        console.error('Kết nối database thất bại:', err.message);
    }
}

testConnection();

export default pool;