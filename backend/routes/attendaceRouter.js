import express from 'express';
import { getAttendanceByMember, getTodayAttendance, markManualAttendance, markQrAttendance } from '../controller/attendancecontroller.js';
const router = express.Router();

router.post('/scan-qr-checkin', markQrAttendance);          // QR Scan
router.post('/manual-checkin', markManualAttendance);    // Manual Check-In
router.get('/today', getTodayAttendance);
router.get('/member/:memberId', getAttendanceByMember);

export default router;