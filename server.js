import express from 'express'; import session from 'express-session';
import routes from './src/routes/index.js';
import pool from './src/config/database.js';
import requireAdminAuth from './src/middlewares/adminAuth.js';

const app = express();
const port = 3000;

// Áp dụng middleware này toàn bộ app
// app.use(requireAdminAuth); // thiết lập middleware kiểm tra web

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: 'modi-secret-key',        // nên lưu trong biến môi trường
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,          // 1 giờ
    },
  })
);

app.use('/', routes);

app.listen(port,'0.0.0.0', async () => {
  let connection; // Khai báo biến connection ở đây
  try {
    // Lấy một kết nối từ pool và gán vào biến connection
    connection = await pool.getConnection();
    console.log('Kết nối database thành công!');
  } catch (err) {
    console.error('Kết nối database thất bại:', err.message);
  } finally {
    // Đảm bảo kết nối được giải phóng về pool dù có lỗi hay không
    if (connection) {
      connection.release();
    }
  }
  console.log(`Express server running at http://localhost:${port}/`);
});
