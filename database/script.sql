-- SQL Script for creating basic tables for a website
-- Database: MySQL
-- ------------------------------------------------------
-- create database Modi;
-- use Modi;
use modi;

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
    hinh_anh VARCHAR(255),
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
    thoi_gian_lam_viec ENUM('Full-time', 'Part-time') default 'Full-time' NOT NULL, -- thêm ở đây
    kinh_nghiem int not null,  -- thêm ở đây
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


-- Dữ liệu mẫu cho bảng dich_vu (Dịch vụ)
INSERT INTO dich_vu (ten_dich_vu, mo_ta) VALUES
('Tư vấn chiến lược kinh doanh', 'Cung cấp các giải pháp và định hướng chiến lược giúp doanh nghiệp phát triển bền vững.'),
('Phát triển phần mềm tùy chỉnh', 'Thiết kế và xây dựng các ứng dụng phần mềm chuyên biệt theo yêu cầu của khách hàng.'),
('Dịch vụ Marketing số', 'Triển khai các chiến dịch quảng cáo trực tuyến, SEO, SEM, quản lý mạng xã hội.'),
('Thiết kế website chuyên nghiệp', 'Xây dựng các trang web đẹp mắt, thân thiện với người dùng và tối ưu hóa cho di động.'),
('Đào tạo kỹ năng mềm', 'Các khóa học phát triển kỹ năng giao tiếp, làm việc nhóm, quản lý thời gian.'),
('Hỗ trợ kỹ thuật 24/7', 'Cung cấp dịch vụ hỗ trợ kỹ thuật liên tục, giải quyết sự cố nhanh chóng.'),
('Quản lý dự án CNTT', 'Đảm bảo các dự án công nghệ thông tin được thực hiện đúng tiến độ và ngân sách.'),
('Phân tích dữ liệu lớn (Big Data)', 'Thu thập, xử lý và phân tích lượng lớn dữ liệu để đưa ra các insight giá trị.'),
('Giải pháp điện toán đám mây', 'Triển khai và quản lý các dịch vụ trên nền tảng đám mây (AWS, Azure, Google Cloud).'),
('Tư vấn an ninh mạng', 'Đánh giá và đề xuất các giải pháp bảo mật nhằm bảo vệ hệ thống khỏi các mối đe dọa mạng.');

-- Dữ liệu mẫu cho bảng tin_tuc (Tin tức)
INSERT INTO tin_tuc (tieu_de, hinh_anh, noi_dung, tac_gia) VALUES
('Xu hướng công nghệ 2024: AI và IoT lên ngôi', 'https://placehold.co/600x400/FF5733/FFFFFF?text=AI+IoT', 'Năm 2024 chứng kiến sự bùng nổ của trí tuệ nhân tạo (AI) và Internet vạn vật (IoT), định hình lại nhiều ngành công nghiệp.', 'Nguyễn Văn A'),
('Lễ ra mắt sản phẩm mới: Giải pháp quản lý thông minh', 'https://placehold.co/600x400/33FF57/FFFFFF?text=Product+Launch', 'Công ty XYZ vừa tổ chức thành công lễ ra mắt sản phẩm phần mềm quản lý doanh nghiệp tích hợp AI.', 'Trần Thị B'),
('Báo cáo tài chính quý II/2024: Tăng trưởng ấn tượng', 'https://placehold.co/600x400/3357FF/FFFFFF?text=Finance+Report', 'Doanh thu và lợi nhuận của công ty đạt mức cao kỷ lục trong quý II, vượt xa kỳ vọng.', 'Lê Văn C'),
('Hội thảo "Chuyển đổi số trong kỷ nguyên mới"', 'https://placehold.co/600x400/FF33A1/FFFFFF?text=Digital+Transformation', 'Hội thảo đã thu hút hàng trăm chuyên gia và doanh nghiệp tham gia, thảo luận về tầm quan trọng của chuyển đổi số.', 'Phạm Thị D'),
('Kỷ niệm 10 năm thành lập công ty', 'https://placehold.co/600x400/A133FF/FFFFFF?text=10+Years', 'Công ty chúng tôi tự hào kỷ niệm 10 năm hình thành và phát triển, đánh dấu một chặng đường đầy thành công.', 'Vũ Văn E'),
('Đầu tư vào nguồn nhân lực chất lượng cao', 'https://placehold.co/600x400/33FFB5/FFFFFF?text=Human+Resources', 'Chúng tôi luôn chú trọng đầu tư vào việc đào tạo và phát triển đội ngũ nhân sự, coi đây là yếu tố then chốt.', 'Hoàng Thị G'),
('Dự án cộng đồng: Công nghệ cho cuộc sống', 'https://placehold.co/600x400/FFB533/FFFFFF?text=Community+Project', 'Công ty đã triển khai nhiều dự án công nghệ nhằm nâng cao chất lượng cuộc sống cho cộng đồng địa phương.', 'Đặng Văn H'),
('Thách thức và cơ hội trong ngành Fintech', 'https://placehold.co/600x400/B533FF/FFFFFF?text=Fintech', 'Ngành công nghệ tài chính (Fintech) đang đối mặt với nhiều thách thức nhưng cũng mở ra vô vàn cơ hội mới.', 'Nguyễn Thị K'),
('Mở rộng thị trường quốc tế', 'https://placehold.co/600x400/33FFA1/FFFFFF?text=Global+Market', 'Kế hoạch mở rộng thị trường sang các quốc gia Đông Nam Á đang được triển khai mạnh mẽ.', 'Trần Văn L'),
('Giải thưởng "Doanh nghiệp sáng tạo nhất năm"', 'https://placehold.co/600x400/A1FF33/FFFFFF?text=Innovation+Award', 'Công ty vinh dự nhận giải thưởng "Doanh nghiệp sáng tạo nhất năm" nhờ những đóng góp đột phá.', 'Phạm Văn M');

-- Dữ liệu mẫu cho bảng tuyen_dung (Tuyển dụng)
INSERT INTO tuyen_dung (vi_tri, mo_ta_cong_viec, yeu_cau_ung_vien, so_luong, thoi_gian_lam_viec, kinh_nghiem, han_nop_ho_so, dia_diem, muc_luong) VALUES
('Lập trình viên Backend (Node.js)', 'Phát triển và duy trì các API, xử lý logic nghiệp vụ.', 'Thành thạo Node.js, Express.js, có kinh nghiệm với MongoDB/PostgreSQL.', 2, 'Full-time', 3, '2025-09-30', 'Hà Nội', '15-25 triệu VND'),
('Chuyên viên Marketing số', 'Lên kế hoạch và triển khai các chiến dịch quảng cáo trên Facebook, Google.', 'Có kinh nghiệm 2 năm trong lĩnh vực Digital Marketing, hiểu biết về SEO/SEM.', 1, 'Full-time', 2, '2025-09-15', 'TP. Hồ Chí Minh', '10-18 triệu VND'),
('Thiết kế đồ họa (UI/UX)', 'Thiết kế giao diện người dùng cho website và ứng dụng di động.', 'Sử dụng thành thạo Figma, Sketch, Photoshop. Có tư duy thiết kế tốt.', 1, 'Full-time', 2, '2025-10-01', 'Đà Nẵng', '12-20 triệu VND'),
('Thực tập sinh Kế toán', 'Hỗ trợ các công việc kế toán hàng ngày, nhập liệu chứng từ.', 'Sinh viên năm cuối hoặc mới tốt nghiệp chuyên ngành Kế toán/Kiểm toán.', 3, 'Part-time', 0, '2025-09-10', 'Hà Nội', 'Thỏa thuận'),
('Quản lý dự án phần mềm', 'Lập kế hoạch, theo dõi và quản lý tiến độ các dự án phần mềm.', 'Có kinh nghiệm 5 năm ở vị trí tương đương, hiểu biết về Agile/Scrum.', 1, 'Full-time', 5, '2025-09-20', 'TP. Hồ Chí Minh', '25-40 triệu VND'),
('Nhân viên kinh doanh', 'Tìm kiếm khách hàng tiềm năng, tư vấn và bán các sản phẩm/dịch vụ của công ty.', 'Có kỹ năng giao tiếp, đàm phán tốt. Ưu tiên có kinh nghiệm bán hàng B2B.', 5, 'Full-time', 1, '2025-10-05', 'Cần Thơ', '8-15 triệu VND + Hoa hồng'),
('Kỹ sư kiểm thử phần mềm (QA/QC)', 'Xây dựng kịch bản kiểm thử, thực hiện kiểm thử chức năng và phi chức năng.', 'Có kinh nghiệm sử dụng các công cụ kiểm thử tự động. Nắm vững quy trình kiểm thử.', 2, 'Full-time', 2, '2025-09-25', 'Hải Phòng', '10-18 triệu VND'),
('Chuyên viên tuyển dụng', 'Thực hiện quy trình tuyển dụng từ tìm kiếm, phỏng vấn đến onboard nhân sự.', 'Có kinh nghiệm 3 năm trong lĩnh vực tuyển dụng, ưu tiên ngành IT.', 1, 'Full-time', 3, '2025-10-15', 'Hà Nội', '12-22 triệu VND'),
('Trưởng nhóm Phát triển di động (iOS/Android)', 'Lãnh đạo đội ngũ phát triển ứng dụng di động, đảm bảo chất lượng sản phẩm.', 'Có kinh nghiệm 7 năm phát triển ứng dụng di động, ít nhất 2 năm ở vị trí quản lý.', 1, 'Full-time', 7, '2025-09-30', 'TP. Hồ Chí Minh', 'Thỏa thuận (Cạnh tranh)'),
('Chuyên viên hỗ trợ kỹ thuật IT', 'Tiếp nhận và giải quyết các vấn đề kỹ thuật cho người dùng.', 'Có kiến thức về hệ điều hành Windows/Linux, mạng máy tính. Khả năng giao tiếp tốt.', 2, 'Full-time', 1, '2025-09-18', 'Đà Nẵng', '8-14 triệu VND');

-- Dữ liệu mẫu cho bảng lien_he (Liên hệ)
INSERT INTO lien_he (ho_ten, email, so_dien_thoai, noi_dung, trang_thai) VALUES
('Nguyễn Thị Hoa', 'hoa.nguyen@example.com', '0912345678', 'Tôi muốn tìm hiểu thêm về dịch vụ tư vấn chiến lược kinh doanh.', 'Chưa phản hồi'),
('Trần Văn Long', 'long.tran@example.com', '0901234567', 'Vui lòng gửi báo giá cho dự án phát triển phần mềm tùy chỉnh.', 'Đã phản hồi'),
('Lê Thị Mai', 'mai.le@example.com', '0987654321', 'Tôi có một số câu hỏi về khóa học Marketing số.', 'Chưa phản hồi'),
('Phạm Đình Tuấn', 'tuan.pham@example.com', '0976543210', 'Cần hỗ trợ kỹ thuật cho website của công ty.', 'Đã phản hồi'),
('Hoàng Anh Thư', 'thu.hoang@example.com', '0965432109', 'Tôi muốn đặt lịch hẹn tư vấn về giải pháp điện toán đám mây.', 'Chưa phản hồi'),
('Đào Duy Mạnh', 'manh.dao@example.com', '0954321098', 'Thông tin tuyển dụng vị trí Lập trình viên Backend có thể gửi chi tiết hơn không?', 'Chưa phản hồi'),
('Võ Thị Kim Anh', 'kimanh.vo@example.com', '0943210987', 'Tôi quan tâm đến dịch vụ phân tích dữ liệu lớn.', 'Đã phản hồi'),
('Bùi Minh Quang', 'quang.bui@example.com', '0932109876', 'Có thể cung cấp thêm thông tin về tin tức "Xu hướng công nghệ 2024" không?', 'Chưa phản hồi'),
('Đỗ Thị Lan', 'lan.do@example.com', '0921098765', 'Tôi muốn góp ý về chất lượng dịch vụ của công ty.', 'Chưa phản hồi'),
('Ngô Văn Hùng', 'hung.ngo@example.com', '0910987654', 'Vui lòng liên hệ để thảo luận về cơ hội hợp tác.', 'Đã phản hồi');


