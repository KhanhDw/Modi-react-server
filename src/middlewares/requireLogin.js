

const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Bạn chưa đăng nhập' });
  }
  next();
};

export default requireLogin;