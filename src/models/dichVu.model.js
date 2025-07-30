import pool from '../config/database.js';

class DichVuModel {
  constructor() {
    // Tên bảng trong cơ sở dữ liệu
    this.tableName = 'dich_vu';
  }

  /**
   * Lấy tất cả các dịch vụ từ cơ sở dữ liệu
   * @returns {Promise<Array>} Mảng các đối tượng dịch vụ
   */
  async getAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} ORDER BY ngay_tao DESC;`);
    return rows;
  }

  /**
   * Lấy một dịch vụ dựa vào ID
   * @param {number} id - ID của dịch vụ cần tìm
   * @returns {Promise<Object|null>} Đối tượng dịch vụ hoặc null nếu không tìm thấy
   */
  async getById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?;`, [id]);
    // rows là một mảng, trả về phần tử đầu tiên nếu có, ngược lại trả về null
    return rows[0] || null;
  }

  /**
   * Thêm một dịch vụ mới vào cơ sở dữ liệu.
   * Cột `id` sẽ được tự động tạo bởi cơ sở dữ liệu (AUTO_INCREMENT).
   * Cột `ngay_tao` sẽ tự động lấy thời gian hiện tại (DEFAULT CURRENT_TIMESTAMP).
   *
   * @param {Object} dichVuData - Dữ liệu của dịch vụ mới.
   * @param {string} dichVuData.ten_dich_vu - Tên của dịch vụ (bắt buộc).
   * @param {string} dichVuData.mo_ta - Mô tả chi tiết cho dịch vụ.
   * @returns {Promise<number>} ID của dịch vụ vừa được thêm vào.
   */
  async add({ ten_dich_vu, mo_ta }) {
    const [result] = await pool.query(
      // Câu lệnh INSERT chỉ cần chỉ định các cột mà chúng ta cung cấp giá trị.
      `INSERT INTO ${this.tableName} (ten_dich_vu, mo_ta) VALUES (?, ?)`,
      [ten_dich_vu, mo_ta]
    );
    // Trả về ID của bản ghi vừa được chèn, do cơ sở dữ liệu tự động tạo.
    return result.insertId;
  }

  /**
   * Cập nhật thông tin một dịch vụ dựa vào ID
   * @param {number} id - ID của dịch vụ cần cập nhật
   * @param {Object} dichVuData - Dữ liệu cần cập nhật
   * @param {string} dichVuData.ten_dich_vu - Tên mới của dịch vụ
   * @param {string} dichVuData.mo_ta - Mô tả mới cho dịch vụ
   * @returns {Promise<number>} Số lượng hàng bị ảnh hưởng (thường là 1 nếu thành công)
   */
  async update(id, { ten_dich_vu, mo_ta }) {
    const [result] = await pool.query(
      `UPDATE ${this.tableName} SET ten_dich_vu = ?, mo_ta = ? WHERE id = ?`,
      [ten_dich_vu, mo_ta, id]
    );
    // Trả về số lượng bản ghi đã được cập nhật
    return result.affectedRows;
  }

  /**
   * Xóa một dịch vụ dựa vào ID
   * @param {number} id - ID của dịch vụ cần xóa
   * @returns {Promise<number>} Số lượng hàng bị ảnh hưởng (thường là 1 nếu thành công)
   */
  async delete(id) {
    const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    // Trả về số lượng bản ghi đã bị xóa
    return result.affectedRows;
  }
}

export default DichVuModel;