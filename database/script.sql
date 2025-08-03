-- SQL Script for creating basic tables for a website
-- Database: MySQL
-- ------------------------------------------------------
create database Modi;
use Modi;

-- Xóa các bảng nếu chúng đã tồn tại để tránh lỗi khi chạy lại script
DROP TABLE IF EXISTS `lien_he`;
DROP TABLE IF EXISTS `tuyen_dung`;
DROP TABLE IF EXISTS `tin_tuc`;
DROP TABLE IF EXISTS `dich_vu`;


-- 1. Bảng Dịch vụ (services)
-- Lưu trữ thông tin về các dịch vụ cung cấp
CREATE TABLE dich_vu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ten_dich_vu VARCHAR(255) NOT NULL,
    mo_ta TEXT,
    ngay_tao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 2. Bảng Tin tức (news)
-- Quản lý các bài viết, tin tức
CREATE TABLE tin_tuc (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tieu_de VARCHAR(255) NOT NULL,
    hinh_anh VARCHAR(255) not null,
    noi_dung TEXT NOT NULL,
    tac_gia VARCHAR(100) not null,
    ngay_dang TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- 3. Bảng Tuyển dụng (recruitment)
-- Đăng các thông tin tuyển dụng việc làm
CREATE TABLE tuyen_dung (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vi_tri VARCHAR(255) NOT NULL,
    mo_ta_cong_viec TEXT NOT NULL,
    yeu_cau_ung_vien TEXT,
    so_luong INT,
    han_nop_ho_so DATE,
    dia_diem VARCHAR(255), -- Thêm cột địa điểm
    muc_luong VARCHAR(100), -- Thêm cột mức lương (dùng VARCHAR để linh hoạt với các giá trị như "Thỏa thuận", "Cạnh tranh", hoặc khoảng lương)
    ngay_dang TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Bảng Liên hệ (contact)
-- Lưu trữ các thông tin liên hệ từ người dùng
CREATE TABLE lien_he (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ho_ten VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    so_dien_thoai varchar(10) Not null,
    noi_dung TEXT NOT NULL,
    trang_thai ENUM('Đã phản hồi', 'Chưa phản hồi') DEFAULT 'Chưa phản hồi' NOT NULL,
    ngay_gui TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;




-- Kết thúc script


-- thêm dữ liệu cho các bảng

-- Dữ liệu mẫu cho các bảng
-- Database: MySQL
-- ------------------------------------------------------

USE Modi;

-- 1. Dữ liệu mẫu cho bảng `dich_vu`
INSERT INTO `dich_vu` (`ten_dich_vu`, `mo_ta`) VALUES
('Tư vấn chiến lược số', 'Cung cấp các giải pháp tư vấn toàn diện về chiến lược chuyển đổi số cho doanh nghiệp.'),
('Phát triển ứng dụng di động', 'Thiết kế và phát triển các ứng dụng di động (iOS, Android) chất lượng cao, tối ưu trải nghiệm người dùng.'),
('Thiết kế website chuyên nghiệp', 'Xây dựng các website đẹp, chuẩn SEO, responsive và tối ưu hóa hiệu suất.'),
('Quản lý hệ thống Cloud', 'Dịch vụ quản lý, bảo trì và tối ưu hóa các hệ thống trên nền tảng điện toán đám mây (AWS, Azure, GCP).'),
('Phân tích dữ liệu lớn', 'Thu thập, xử lý và phân tích dữ liệu lớn để đưa ra các insight kinh doanh giá trị.');

-- 2. Dữ liệu mẫu cho bảng `tin_tuc`
INSERT INTO `tin_tuc` (`tieu_de`, `noi_dung`, `tac_gia`) VALUES
('Xu hướng chuyển đổi số 2024', 'Bài viết phân tích các xu hướng công nghệ nổi bật và tác động của chúng đến doanh nghiệp trong năm 2024.', 'Nguyễn Văn A'),
('Lợi ích của ứng dụng di động trong kinh doanh', 'Khám phá những lợi ích vượt trội mà ứng dụng di động mang lại cho các mô hình kinh doanh hiện đại.', 'Trần Thị B'),
('Bảo mật dữ liệu trên Cloud: Những điều cần biết', 'Hướng dẫn chi tiết về các biện pháp bảo mật dữ liệu hiệu quả khi sử dụng dịch vụ điện toán đám mây.', 'Lê Văn C'),
('Cách tối ưu SEO cho website doanh nghiệp', 'Chia sẻ các thủ thuật và chiến lược tối ưu hóa công cụ tìm kiếm (SEO) giúp website của bạn đạt thứ hạng cao hơn.', 'Phạm Thị D'),
('AI và tương lai của ngành công nghệ', 'Thảo luận về vai trò của trí tuệ nhân tạo (AI) và những dự đoán về sự phát triển của ngành công nghệ trong tương lai.', 'Hoàng Minh E');

-- 3. Dữ liệu mẫu cho bảng `tuyen_dung`
INSERT INTO `tuyen_dung` (`vi_tri`, `mo_tadich_vu_cong_viec`, `yeu_cau_ung_vien`, `so_luong`, `han_nop_ho_so`, `dia_diem`, `muc_luong`) VALUES
('Lập trình viên Backend (Java/Node.js)', 'Phát triển và bảo trì các API và dịch vụ backend cho ứng dụng web và di động.', 'Có kinh nghiệm 2+ năm với Java/Node.js, hiểu biết về cơ sở dữ liệu SQL/NoSQL.', 2, '2025-08-31', 'Hà Nội', '15-25 triệu VND'),
('Chuyên viên Marketing số', 'Lên kế hoạch và triển khai các chiến dịch marketing trên các kênh số (SEO, SEM, Social Media).', 'Có kinh nghiệm 1+ năm trong marketing số, kỹ năng phân tích và sáng tạo tốt.', 1, '2025-08-15', 'TP. Hồ Chí Minh', '10-18 triệu VND'),
('Thiết kế UI/UX', 'Thiết kế giao diện người dùng và trải nghiệm người dùng cho các sản phẩm số.', 'Có kinh nghiệm 2+ năm thiết kế UI/UX, thành thạo Figma/Sketch/Adobe XD.', 1, '2025-09-10', 'Đà Nẵng', '12-20 triệu VND'),
('Kỹ sư DevOps', 'Xây dựng và quản lý hạ tầng CI/CD, tự động hóa quy trình triển khai.', 'Có kinh nghiệm 3+ năm với Docker, Kubernetes, Jenkins, AWS/Azure.', 1, '2025-09-01', 'Hà Nội', '20-35 triệu VND'),
('Thực tập sinh Frontend (ReactJS)', 'Hỗ trợ phát triển giao diện người dùng với ReactJS.', 'Sinh viên năm cuối hoặc mới tốt nghiệp ngành CNTT, có kiến thức cơ bản về HTML, CSS, JavaScript, ReactJS.', 3, '2025-08-20', 'TP. Hồ Chí Minh', 'Thỏa thuận');

-- 4. Dữ liệu mẫu cho bảng `lien_he`
INSERT INTO `lien_he` (`ho_ten`, `email`, `noi_dung`, `so_dien_thoai`, `trang_thai`) VALUES
('Nguyễn Thị Lan', 'lan.nguyen@example.com', 'Tôi muốn tìm hiểu thêm về dịch vụ tư vấn chiến lược số của quý công ty.', '0912345678', 'Chưa phản hồi'),
('Trần Văn Hùng', 'hung.tran@example.com', 'Tôi có một dự án phát triển ứng dụng di động, xin vui lòng liên hệ để thảo luận chi tiết.', '0987654321', 'Chưa phản hồi'),
('Lê Thị Mai', 'mai.le@example.com', 'Tôi cần báo giá cho dịch vụ thiết kế website chuyên nghiệp.', '0901234567', 'Chưa phản hồi'),
('Phạm Quang Vinh', 'vinh.pham@example.com', 'Tôi muốn hỏi về cơ hội hợp tác trong lĩnh vực phân tích dữ liệu.', '0978123456', 'Chưa phản hồi'),
('Đỗ Thanh Nga', 'nga.do@example.com', 'Có thể tư vấn giúp tôi về giải pháp quản lý Cloud cho doanh nghiệp nhỏ không?', '0965432109', 'Chưa phản hồi');
