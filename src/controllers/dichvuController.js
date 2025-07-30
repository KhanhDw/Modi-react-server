import DichVuModel from "../models/dichVu.model.js";

const dichvu = new DichVuModel(); // instance

// Lấy tất cả dịch vụ
const getAllDichVu = async (req, res) => {
    try {
        const dichVuList = await dichvu.getAll();
        console.log('Danh sách dịch vụ:', dichVuList);
        res.json(dichVuList);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

// Lấy dịch vụ theo ID
const getDichVuById = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ request parameters
        const dichVu = await dichvu.getById(id);
        if (dichVu) {
            res.json(dichVu);
        } else {
            res.status(404).json({ error: 'Không tìm thấy dịch vụ' });
        }
    } catch (error) {
        console.error('Lỗi khi lấy dịch vụ theo ID:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

// Thêm dịch vụ mới
const addDichVu = async (req, res) => {
    try {
        const newDichVu = req.body; // Lấy dữ liệu dịch vụ mới từ request body
        const result = await dichvu.add(newDichVu);
        res.status(201).json({ message: 'Thêm dịch vụ thành công', data: result });
    } catch (error) {
        console.error('Lỗi khi thêm dịch vụ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

// Cập nhật dịch vụ theo ID
const updateDichVu = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ request parameters
        const updatedDichVu = req.body; // Lấy dữ liệu cập nhật từ request body
        const result = await dichvu.update(id, updatedDichVu);
        if (result) {
            res.json({ message: 'Cập nhật dịch vụ thành công', data: result });
        } else {
            res.status(404).json({ error: 'Không tìm thấy dịch vụ để cập nhật' });
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật dịch vụ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

// Xóa dịch vụ theo ID
const deleteDichVu = async (req, res) => {
    try {
        const { id } = req.params; // Lấy id từ request parameters
        const result = await dichvu.delete(id);
        if (result) {
            res.json({ message: 'Xóa dịch vụ thành công' });
        } else {
            res.status(404).json({ error: 'Không tìm thấy dịch vụ để xóa' });
        }
    } catch (error) {
        console.error('Lỗi khi xóa dịch vụ:', error);
        res.status(500).json({ error: 'Lỗi máy chủ nội bộ: ' + error });
    }
}

export default {
    getAllDichVu,
    getDichVuById,
    addDichVu,
    updateDichVu,
    deleteDichVu,
};