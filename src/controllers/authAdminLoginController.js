import jwt from "jsonwebtoken";
const JWT_SECRET = "your_jwt_secret_key";

const AuthAdminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username === "admin" && password === "1234") {
            const adminData = {
                username,
                role: "admin",
            };

            const accessToken = jwt.sign(adminData, JWT_SECRET, { expiresIn: "1h" });
            res.json({ message: "Đăng nhập thành công", accessToken, adminData: adminData });
        }
    } catch (error) {
        console.error('Lỗi khi lấy danh sách dịch vụ:', error);
        res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
    }
}


export default {
    AuthAdminLogin,
};