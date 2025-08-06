import mysql from 'mysql2/promise';
import fs from 'fs'; // Dùng để đọc file ca.pem nếu chạy local

// Tạo pool kết nối với Aiven MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3307,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'modi',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: {
        // Dùng cho chạy local, nếu triển khai trên Render thì bỏ hoặc đặt ssl: true
        ca: process.env.NODE_ENV === 'production' ? undefined : fs.readFileSync('D:\\CongViec\\Modi\\ca.pem')
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