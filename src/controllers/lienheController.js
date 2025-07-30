import LienHeModel from "../models/lienHe.model.js";

// Khởi tạo instance cho LienHeModel
const lienhe = new LienHeModel();

/**
 * Lấy tất cả các liên hệ
 * Chức năng này thường dành cho trang quản trị (admin)
 */
const getAllLienHe = async (req, res) => {
    try {
        const lienHeList = await lienhe.getAll();
        res.json(lienHeList);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách liên hệ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Lấy một liên hệ cụ thể theo ID
 * Chức năng này thường dành cho trang quản trị (admin)
 */
const getLienHeById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ request parameters
        const lienHeItem = await lienhe.getById(id);
        if (lienHeItem) {
            res.json(lienHeItem);
        } else {
            res.status(404).json({ error: 'Không tìm thấy liên hệ' });
        }
    } catch (error) {
        console.error('Lỗi khi lấy liên hệ theo ID:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Thêm liên hệ mới (thường từ form liên hệ của người dùng)
 */
const addLienHe = async (req, res) => {
    try {
        // Dữ liệu mong đợi từ client: { ho_ten, email, so_dien_thoai, noi_dung }
        const newLienHe = req.body; 
        const resultId = await lienhe.add(newLienHe);
        res.status(201).json({ message: 'Gửi liên hệ thành công!', data: { id: resultId } });
    } catch (error) {
        console.error('Lỗi khi gửi liên hệ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Cập nhật một liên hệ (ví dụ: cập nhật trạng thái "đã đọc", "đã trả lời")
 * Chức năng này thường dành cho trang quản trị (admin)
 */
const updateLienHe = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedLienHe = req.body; // Dữ liệu cập nhật, ví dụ: { trang_thai: 'Đã đọc' }
        const affectedRows = await lienhe.update(id, updatedLienHe);
        
        if (affectedRows > 0) {
            res.json({ message: 'Cập nhật liên hệ thành công' });
        } else {
            res.status(404).json({ error: 'Không tìm thấy liên hệ để cập nhật' });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật liên hệ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Xóa một liên hệ theo ID
 * Chức năng này thường dành cho trang quản trị (admin)
 */
const deleteLienHe = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await lienhe.delete(id);

        if (affectedRows > 0) {
            res.json({ message: 'Xóa liên hệ thành công' });
        } else {
            res.status(404).json({ error: 'Không tìm thấy liên hệ để xóa' });
        }
    } catch (error) {
        console.error('Lỗi khi xóa liên hệ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

// Xuất tất cả các hàm để sử dụng trong file routes
export default {
    getAllLienHe,
    getLienHeById,
    addLienHe,
    updateLienHe,
    deleteLienHe,
};
