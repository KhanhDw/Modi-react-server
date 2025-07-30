const requireAdminAuth = (req, res, next) => {
    const isLoggedIn = req.session.user ? true : false; 

    if (req.originalUrl.startsWith('/admin') && !isLoggedIn) {
        return res.status(401).json({ message: 'Bạn phải đăng nhập để vào khu vực admin.' });
    }

    next();
};

export default requireAdminAuth;