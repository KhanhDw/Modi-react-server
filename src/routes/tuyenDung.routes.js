import express from 'express';
// Import controller cho tuyển dụng
import tuyenDungController from '../controllers/tuyendungController.js';

const router = express.Router();

// --- ĐỊNH NGHĨA CÁC ROUTE CHO TÀI NGUYÊN "TUYỂN DỤNG" ---

// GET / -> Lấy danh sách tất cả các tin tuyển dụng
// Tương ứng với hàm: getAllTuyenDung
router.get('/', tuyenDungController.getAllTuyenDung);

// POST / -> Đăng một tin tuyển dụng mới
// Tương ứng với hàm: addTuyenDung
router.post('/', tuyenDungController.addTuyenDung);

// GET /:id -> Lấy thông tin chi tiết của một tin tuyển dụng theo ID
// Tương ứng với hàm: getTuyenDungById
router.get('/:id', tuyenDungController.getTuyenDungById);

// PUT /:id -> Cập nhật thông tin của một tin tuyển dụng theo ID
// Tương ứng với hàm: updateTuyenDung
router.put('/:id', tuyenDungController.updateTuyenDung);

// DELETE /:id -> Xóa một tin tuyển dụng theo ID
// Tương ứng với hàm: deleteTuyenDung
router.delete('/:id', tuyenDungController.deleteTuyenDung);

export default router;