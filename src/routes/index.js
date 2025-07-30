import express from 'express';
import dichvuRouter from './dichVu.routes.js';
import lienheRouter from './lienHe.routes.js';
import tintucRouter from './tinTuc.routes.js';
import tuyendungRouter from './tuyenDung.routes.js';



const router = express.Router();

router.use('/dichvu', dichvuRouter);
router.use('/lienhe', lienheRouter); 
router.use('/tintuc', tintucRouter); 
router.use('/tuyendung', tuyendungRouter); 

export default router;
