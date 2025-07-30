import pool from '../config/database.js';

class TinTucModel {
  constructor() {
    // Tên bảng trong cơ sở dữ liệu
    this.tableName = 'tin_tuc';
  }

  /**
   * Lấy tất cả các tin tức từ cơ sở dữ liệu, sắp xếp theo ngày tạo mới nhất
   * @returns {Promise<Array>} Mảng các đối tượng tin tức
   */
  async getAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} ORDER BY ngay_dang DESC;`);
    return rows;
  }

  /**
   * Lấy một tin tức dựa vào ID
   * @param {number} id - ID của tin tức cần tìm
   * @returns {Promise<Object|null>} Đối tượng tin tức hoặc null nếu không tìm thấy
   */
  async getById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?;`, [id]);
    return rows[0] || null;
  }

  /**
   * Thêm một tin tức mới vào cơ sở dữ liệu
   * @param {Object} tinTucData - Dữ liệu của tin tức mới
   * @param {string} tinTucData.tieu_de - Tiêu đề của bài viết
   * @param {string} tinTucData.mo_ta_ngan - Mô tả ngắn (excerpt) cho bài viết
   * @param {string} tinTucData.noi_dung - Nội dung chi tiết của bài viết
   * @param {string} [tinTucData.hinh_anh] - URL hoặc đường dẫn đến hình ảnh đại diện
   * @returns {Promise<number>} ID của tin tức vừa được thêm
   */
  async add({ tieu_de, noi_dung, tac_gia }) {
    const [result] = await pool.query(
      `INSERT INTO ${this.tableName} (tieu_de, noi_dung, tac_gia) VALUES (?, ?, ?)`,
      [tieu_de, noi_dung, tac_gia]
    );
    // Trả về ID của bản ghi vừa được chèn
    return result.insertId;
  }

  /**
   * Cập nhật thông tin một tin tức dựa vào ID
   * @param {number} id - ID của tin tức cần cập nhật
   * @param {Object} tinTucData - Dữ liệu cần cập nhật
   * @param {string} tinTucData.tieu_de - Tiêu đề mới
   * @param {string} tinTucData.mo_ta_ngan - Mô tả ngắn mới
   * @param {string} tinTucData.noi_dung - Nội dung mới
   * @param {string} [tinTucData.hinh_anh] - Hình ảnh mới
   * @returns {Promise<number>} Số lượng hàng bị ảnh hưởng
   */
  async update(id, { tieu_de, noi_dung }) {
    const [result] = await pool.query(
      `UPDATE ${this.tableName} SET tieu_de = ?, noi_dung = ? WHERE id = ?`,
      [tieu_de, noi_dung, id]
    );
    // Trả về số lượng bản ghi đã được cập nhật
    return result.affectedRows;
  }

  /**
   * Xóa một tin tức dựa vào ID
   * @param {number} id - ID của tin tức cần xóa
   * @returns {Promise<number>} Số lượng hàng bị ảnh hưởng
   */
  async delete(id) {
    const [result] = await pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    // Trả về số lượng bản ghi đã bị xóa
    return result.affectedRows;
  }
}

export default TinTucModel;