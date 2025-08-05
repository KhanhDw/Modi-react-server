import pool from '../config/database.js';

class TuyenDungModel {
  constructor() {
    // Tên bảng trong cơ sở dữ liệu
    this.tableName = 'tuyen_dung';
  }

  async getAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} ORDER BY ngay_dang DESC;`);
    return rows;
  }

  async getById(id) {
    const [rows] = await pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?;`, [id]);
    return rows[0] || null;
  }

  // Phương thức thêm mới bản ghi tuyển dụng, đã bao gồm tất cả các trường cần thiết
  async add({ vi_tri, mo_ta_cong_viec, yeu_cau_ung_vien, so_luong, thoi_gian_lam_viec, kinh_nghiem, han_nop_ho_so, dia_diem, muc_luong }) {
    const [result] = await pool.query(
      `INSERT INTO ${this.tableName} (vi_tri, mo_ta_cong_viec, yeu_cau_ung_vien, so_luong, thoi_gian_lam_viec, kinh_nghiem, han_nop_ho_so, dia_diem, muc_luong) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [vi_tri, mo_ta_cong_viec, yeu_cau_ung_vien, so_luong, thoi_gian_lam_viec, kinh_nghiem, han_nop_ho_so, dia_diem, muc_luong]
    );
    // Trả về ID của bản ghi vừa được chèn
    return result.insertId;
  }

  // Phương thức cập nhật bản ghi tuyển dụng, đã bao gồm tất cả các trường có thể cập nhật
  async update(id, { vi_tri, mo_ta_cong_viec, yeu_cau_ung_vien, so_luong, thoi_gian_lam_viec, kinh_nghiem, han_nop_ho_so, dia_diem, muc_luong }) {
    const [result] = await pool.query(
      `UPDATE ${this.tableName} SET 
        vi_tri = ?, 
        mo_ta_cong_viec = ?, 
        yeu_cau_ung_vien = ?, 
        so_luong = ?, 
        thoi_gian_lam_viec = ?,
        kinh_nghiem = ?,
        han_nop_ho_so = ?, 
        dia_diem = ?, 
        muc_luong = ? 
      WHERE id = ?`,
      [vi_tri, mo_ta_cong_viec, yeu_cau_ung_vien, so_luong, thoi_gian_lam_viec, kinh_nghiem, han_nop_ho_so, dia_diem, muc_luong, id]
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

export default TuyenDungModel;
