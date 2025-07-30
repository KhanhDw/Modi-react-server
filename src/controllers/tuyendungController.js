import TuyenDungModel from "../models/tuyenDung.model.js";

// Khởi tạo instance cho TuyenDungModel
const tuyendung = new TuyenDungModel();

/**
 * Lấy tất cả các tin tuyển dụng
 */
const getAllTuyenDung = async (req, res) => {
    try {
        const tuyenDungList = await tuyendung.getAll();
        res.json(tuyenDungList);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách tuyển dụng:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Lấy một tin tuyển dụng cụ thể theo ID
 */
const getTuyenDungById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ request parameters
        const tuyenDungItem = await tuyendung.getById(id);
        if (tuyenDungItem) {
            res.json(tuyenDungItem);
        } else {
            res.status(404).json({ error: 'Không tìm thấy tin tuyển dụng' });
        }
    } catch (error) {
        console.error('Lỗi khi lấy tin tuyển dụng theo ID:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Thêm một tin tuyển dụng mới
 */
const addTuyenDung = async (req, res) => {
    try {
        // Dữ liệu mong đợi từ client: { chuc_vu, mo_ta, dia_diem, muc_luong, han_nop }
        const newTuyenDung = req.body; 
        const resultId = await tuyendung.add(newTuyenDung);
        res.status(201).json({ message: 'Đăng tin tuyển dụng thành công!', data: { id: resultId } });
    } catch (error) {
        console.error('Lỗi khi đăng tin tuyển dụng:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Cập nhật một tin tuyển dụng theo ID
 */
const updateTuyenDung = async (req, res) => {
    try {
        const { id } = req.params; 
        const updatedTuyenDung = req.body; // Dữ liệu cần cập nhật
        const affectedRows = await tuyendung.update(id, updatedTuyenDung);
        
        if (affectedRows > 0) {
            res.json({ message: 'Cập nhật tin tuyển dụng thành công' });
        } else {
            res.status(404).json({ error: 'Không tìm thấy tin tuyển dụng để cập nhật' });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật tin tuyển dụng:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

/**
 * Xóa một tin tuyển dụng theo ID
 */
const deleteTuyenDung = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await tuyendung.delete(id);

        if (affectedRows > 0) {
            res.json({ message: 'Xóa tin tuyển dụng thành công' });
        } else {
            res.status(404).json({ error: 'Không tìm thấy tin tuyển dụng để xóa' });
        }
    } catch (error) {
        console.error('Lỗi khi xóa tin tuyển dụng:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

// Xuất tất cả các hàm để sử dụng trong file routes
export default {
    getAllTuyenDung,
    getTuyenDungById,
    addTuyenDung,
    updateTuyenDung,
    deleteTuyenDung,
};