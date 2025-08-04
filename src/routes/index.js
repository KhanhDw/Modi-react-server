import express from 'express';
import dichvuRouter from './dichVu.routes.js';
import lienheRouter from './lienHe.routes.js';
import tintucRouter from './tinTuc.routes.js';
import tuyendungRouter from './tuyenDung.routes.js';
import authAdminLoginController from '../controllers/authAdminLoginController.js';



const router = express.Router();

// USE
router.use('/api/dichvu', dichvuRouter);
router.use('/api/lienhe', lienheRouter);
router.use('/api/tintuc', tintucRouter);
router.use('/api/tuyendung', tuyendungRouter);

// POST
router.post('/api/admin/login', authAdminLoginController.AuthAdminLogin);


export default router;