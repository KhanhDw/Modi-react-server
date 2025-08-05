import pool from '../config/database.js';

class LienHeModel {
  constructor() {
    // Tên bảng trong cơ sở dữ liệu
    this.tableName = 'lien_he';
  }

  async getAll() {
    // Sắp xếp theo ngay_tao giảm dần để xem liên hệ mới nhất trước
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} ORDER BY ngay_gui DESC;`);
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?;`, [id]);
    return rows[0] || null;
  }

  async add({ ho_ten, email, so_dien_thoai, noi_dung }) {
    const [result] = await pool.query(
      `INSERT INTO ${this.tableName} (ho_ten, email, so_dien_thoai, noi_dung) VALUES (?, ?, ?, ?)`,
      [ho_ten, email, so_dien_thoai, noi_dung]
    );
    // Trả về ID của bản ghi vừa được chèn
    return result.insertId;
  }

  async update(id, { trang_thai }) {
    // Câu lệnh này được thiết kế để chỉ cập nhật trạng thái
    const [result] = await pool.query(
      `UPDATE ${this.tableName} SET trang_thai = ? WHERE id = ?`,
      [trang_thai, id]
    );
    // Trả về số lượng bản ghi đã được cập nhật
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    // Trả về số lượng bản ghi đã bị xóa
    return result.affectedRows;
  }
}

export default LienHeModel;