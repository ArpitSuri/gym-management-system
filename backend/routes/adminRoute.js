import express from 'express';
import { getDashboardStats } from '../controller/adminController.js';


const router = express.Router();

router.get('/stats', getDashboardStats);

export default router;
