import mysql from 'mysql2/promise';

// Thay đổi các thông tin này cho phù hợp với database của bạn
const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'modi',
    port: 3333,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool;