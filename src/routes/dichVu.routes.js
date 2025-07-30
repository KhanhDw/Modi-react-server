import express from 'express';
// Import controller, nơi chứa tất cả các hàm xử lý logic
import dichVuController from '../controllers/dichvuController.js';

const router = express.Router();

// --- ĐỊNH NGHĨA CÁC ROUTE CHO TÀI NGUYÊN "DỊCH VỤ" ---

// GET / -> Lấy danh sách tất cả dịch vụ
// Tương ứng với hàm: getAllDichVu
router.get('/', dichVuController.getAllDichVu);

// POST / -> Tạo một dịch vụ mới
// Tương ứng với hàm: addDichVu
router.post('/', dichVuController.addDichVu);

// GET /:id -> Lấy thông tin chi tiết của một dịch vụ theo ID
// Tương ứng với hàm: getDichVuById
router.get('/:id', dichVuController.getDichVuById);

// PUT /:id -> Cập nhật thông tin của một dịch vụ theo ID
// Tương ứng với hàm: updateDichVu
router.put('/:id', dichVuController.updateDichVu);

// DELETE /:id -> Xóa một dịch vụ theo ID
// Tương ứng với hàm: deleteDichVu
router.delete('/:id', dichVuController.deleteDichVu);

export default router;