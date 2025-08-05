import pool from '../config/database.js';

class TinTucModel {
  constructor() {
    // Tên bảng trong cơ sở dữ liệu
    this.tableName = 'tin_tuc';
  }

  async getAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} ORDER BY ngay_dang DESC;`);
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?;`, [id]);
    return rows[0] || null;
  }

  // Phương thức thêm mới bản ghi tin tức, đã bao gồm trường hinh_anh
  async add({ tieu_de, hinh_anh, noi_dung, tac_gia }) {
    const [result] = await pool.query(
      `INSERT INTO ${this.tableName} (tieu_de, hinh_anh, noi_dung, tac_gia) VALUES (?, ?, ?, ?)`,
      [tieu_de, hinh_anh, noi_dung, tac_gia]
    );
    // Trả về ID của bản ghi vừa được chèn
    return result.insertId;
  }

  // Phương thức cập nhật bản ghi tin tức, đã bao gồm trường hinh_anh
  async update(id, { tieu_de, hinh_anh, noi_dung }) {
    const [result] = await pool.query(
      `UPDATE ${this.tableName} SET tieu_de = ?, hinh_anh = ?, noi_dung = ? WHERE id = ?`,
      [tieu_de, hinh_anh, noi_dung, id]
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

export default TinTucModel;
