import pool from '../config/database.js';

class DichVuModel {
  constructor() {
    // Tên bảng trong cơ sở dữ liệu
    this.tableName = 'dich_vu';
  }

  async getAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} ORDER BY ngay_tao DESC;`);
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?;`, [id]);
    // rows là một mảng, trả về phần tử đầu tiên nếu có, ngược lại trả về null
    return rows[0] || null;
  }


  async add({ ten_dich_vu, mo_ta }) {
    const [result] = await pool.query(
      // Câu lệnh INSERT chỉ cần chỉ định các cột mà chúng ta cung cấp giá trị.
      `INSERT INTO ${this.tableName} (ten_dich_vu, mo_ta) VALUES (?, ?)`,
      [ten_dich_vu, mo_ta]
    );
    // Trả về ID của bản ghi vừa được chèn, do cơ sở dữ liệu tự động tạo.
    return result.insertId;
  }


  async update(id, { ten_dich_vu, mo_ta }) {
    const [result] = await pool.query(
      `UPDATE ${this.tableName} SET ten_dich_vu = ?, mo_ta = ? WHERE id = ?`,
      [ten_dich_vu, mo_ta, id]
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

export default DichVuModel;