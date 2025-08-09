use modi;

select * from dich_vu;
select * from lien_he;
select * from tuyen_dung;
select * from tin_tuc;

SELECT * FROM tin_tuc ORDER BY ngay_dang DESC;

alter table lien_he add column so_dien_thoai varchar(10) not null; 

truncate lien_he;

ALTER TABLE lien_he ADD COLUMN trang_thai ENUM('Đã phản hồi', 'Chưa phản hồi') DEFAULT 'Chưa phản hồi' NOT NULL;

truncate tuyen_dung;

ALTER TABLE tuyen_dung ADD COLUMN dia_diem VARCHAR(255);

ALTER TABLE tuyen_dung ADD COLUMN muc_luong VARCHAR(100);

ALTER TABLE tin_tuc ADD COLUMN hinh_anh VARCHAR(255) not null;

ALTER TABLE tin_tuc MODIFY hinh_anh VARCHAR(255) NULL;

INSERT INTO tin_tuc (tieu_de, hinh_anh, noi_dung, tac_gia) VALUES
('Xu hướng công ng', 'https://placehold.co/600x400/FF5733/FFFFFF?text=AI+IoT', 'Năm 2024 chứng kiến sự bùng nổ của trí tuệ nhân tạo (AI) và Internet vạn vật (IoT), định hình lại nhiều ngành công nghiệp.', 'Nguyễn Văn A');