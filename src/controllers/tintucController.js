import TinTucModel from "../models/tinTuc.model.js";

// Khởi tạo instance cho TinTucModel
const tintuc = new TinTucModel();

/**
 * Lấy tất cả các tin tức, thường sắp xếp theo ngày đăng mới nhất
 */
const getAllTinTuc = async (req, res) => {
    try {
        const tinTucList = await tintuc.getAll();
        res.json(tinTucList);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách tin tức:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Lấy một tin tức cụ thể theo ID
 */
const getTinTucById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ request parameters
        const tinTucItem = await tintuc.getById(id);
        if (tinTucItem) {
            res.json(tinTucItem);
        } else {
            res.status(404).json({ error: 'Không tìm thấy tin tức' });
        }
    } catch (error) {
        console.error('Lỗi khi lấy tin tức theo ID:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Thêm một tin tức mới (chức năng cho admin hoặc người viết bài)
 */
const addTinTuc = async (req, res) => {
    try {
        // Dữ liệu mong đợi từ client: { tieu_de, noi_dung, hinh_anh, tac_gia_id, ... }
        const newTinTuc = req.body; 
        const resultId = await tintuc.add(newTinTuc);
        res.status(201).json({ message: 'Đăng tin tức thành công!', data: { id: resultId } });
    } catch (error) {
        console.error('Lỗi khi đăng tin tức:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Cập nhật một tin tức theo ID
 */
const updateTinTuc = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedTinTuc = req.body; // Dữ liệu cần cập nhật
        const affectedRows = await tintuc.update(id, updatedTinTuc);
        
        if (affectedRows > 0) {
            res.json({ message: 'Cập nhật tin tức thành công' });
        } else {
            res.status(404).json({ error: 'Không tìm thấy tin tức để cập nhật' });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật tin tức:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Xóa một tin tức theo ID
 */
const deleteTinTuc = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await tintuc.delete(id);

        if (affectedRows > 0) {
            res.json({ message: 'Xóa tin tức thành công' });
        } else {
            res.status(404).json({ error: 'Không tìm thấy tin tức để xóa' });
        }
    } catch (error) {
        console.error('Lỗi khi xóa tin tức:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

// Xuất tất cả các hàm để sử dụng trong file routes
export default {
    getAllTinTuc,
    getTinTucById,
    addTinTuc,
    updateTinTuc,
    deleteTinTuc,
};