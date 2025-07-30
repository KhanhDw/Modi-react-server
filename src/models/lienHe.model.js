import pool from '../config/database.js';

class LienHeModel {
  constructor() {
    // Tên bảng trong cơ sở dữ liệu
    this.tableName = 'lien_he';
  }

  /**
   * Lấy tất cả các liên hệ từ cơ sở dữ liệu, sắp xếp theo ngày tạo mới nhất
   * @returns {Promise<Array>} Mảng các đối tượng liên hệ
   */
  async getAll() {
    // Sắp xếp theo ngay_tao giảm dần để xem liên hệ mới nhất trước
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} ORDER BY ngay_gui DESC;`);
    return rows;
  }

  /**
   * Lấy một liên hệ dựa vào ID
   * @param {number} id - ID của liên hệ cần tìm
   * @returns {Promise<Object|null>} Đối tượng liên hệ hoặc null nếu không tìm thấy
   */
  async getById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?;`, [id]);
    return rows[0] || null;
  }

  /**
   * Thêm một liên hệ mới (thường từ form của người dùng)
   * @param {Object} lienHeData - Dữ liệu của liên hệ mới
   * @param {string} lienHeData.ho_ten - Họ và tên người gửi
   * @param {string} lienHeData.email - Email người gửi
   * @param {string} [lienHeData.so_dien_thoai] - Số điện thoại người gửi (có thể không bắt buộc)
   * @param {string} lienHeData.noi_dung - Nội dung liên hệ
   * @returns {Promise<number>} ID của liên hệ vừa được thêm
   */
  async add({ ho_ten, email, so_dien_thoai, noi_dung }) {
    const [result] = await pool.query(
      `INSERT INTO ${this.tableName} (ho_ten, email, so_dien_thoai, noi_dung) VALUES (?, ?, ?, ?)`,
      [ho_ten, email, so_dien_thoai, noi_dung]
    );
    // Trả về ID của bản ghi vừa được chèn
    return result.insertId;
  }

  /**
   * Cập nhật thông tin một liên hệ (ví dụ: cập nhật trạng thái)
   * @param {number} id - ID của liên hệ cần cập nhật
   * @param {Object} lienHeData - Dữ liệu cần cập nhật
   * @param {string} lienHeData.trang_thai - Trạng thái mới của liên hệ (ví dụ: 'Đã đọc', 'Đã trả lời')
   * @returns {Promise<number>} Số lượng hàng bị ảnh hưởng
   */
  async update(id, { trang_thai }) {
    // Câu lệnh này được thiết kế để chỉ cập nhật trạng thái
    const [result] = await pool.query(
      `UPDATE ${this.tableName} SET trang_thai = ? WHERE id = ?`,
      [trang_thai, id]
    );
    // Trả về số lượng bản ghi đã được cập nhật
    return result.affectedRows;
  }

  /**
   * Xóa một liên hệ dựa vào ID
   * @param {number} id - ID của liên hệ cần xóa
   * @returns {Promise<number>} Số lượng hàng bị ảnh hưởng
   */
  async delete(id) {
    const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    // Trả về số lượng bản ghi đã bị xóa
    return result.affectedRows;
  }
}

export default LienHeModel;