import express from 'express';
// Import controller, nơi chứa tất cả các hàm xử lý logic
import lienheController from '../controllers/lienHeController.js';

const router = express.Router();

// --- ĐỊNH NGHĨA CÁC ROUTE CHO TÀI NGUYÊN "DỊCH VỤ" ---

// GET / -> Lấy danh sách tất cả dịch vụ
// Tương ứng với hàm: getAllLienHe
router.get('/', lienheController.getAllLienHe);

// POST / -> Tạo một dịch vụ mới
// Tương ứng với hàm: addLienHe
router.post('/', lienheController.addLienHe);

// GET /:id -> Lấy thông tin chi tiết của một dịch vụ theo ID
// Tương ứng với hàm: getLienHeById
router.get('/:id', lienheController.getLienHeById);

// PUT /:id -> Cập nhật thông tin của một dịch vụ theo ID
// Tương ứng với hàm: updateLienHe
router.put('/:id', lienheController.updateLienHe);

// DELETE /:id -> Xóa một dịch vụ theo ID
// Tương ứng với hàm: deleteLienHe
router.delete('/:id', lienheController.deleteLienHe);

export default router;