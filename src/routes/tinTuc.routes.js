import express from 'express';
// Import controller cho tin tức
import tinTucController from '../controllers/tintucController.js';

const router = express.Router();

// --- ĐỊNH NGHĨA CÁC ROUTE CHO TÀI NGUYÊN "TIN TỨC" ---

// GET / -> Lấy danh sách tất cả tin tức
// Tương ứng với hàm: getAllTinTuc
router.get('/', tinTucController.getAllTinTuc);

// POST / -> Tạo một tin tức mới
// Tương ứng với hàm: addTinTuc
router.post('/', tinTucController.addTinTuc);

// GET /:id -> Lấy thông tin chi tiết của một tin tức theo ID
// Tương ứng với hàm: getTinTucById
router.get('/:id', tinTucController.getTinTucById);

// PUT /:id -> Cập nhật thông tin của một tin tức theo ID
// Tương ứng với hàm: updateTinTuc
router.put('/:id', tinTucController.updateTinTuc);

// DELETE /:id -> Xóa một tin tức theo ID
// Tương ứng với hàm: deleteTinTuc
router.delete('/:id', tinTucController.deleteTinTuc);

export default router;