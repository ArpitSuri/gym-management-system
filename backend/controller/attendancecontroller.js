import Member from '../models/memberModel.js';
import Attendance from '../models/attendanceModel.js';

// POST /api/attendance/scan

export const markQrAttendance = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!phone) {
            return res.status(400).json({ success: false, message: 'Phone number is required' });
        }

        const member = await Member.findOne({ phone });

        if (!member) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }

        // Check if member is active
        const hasActivePlan = member.membershipPlans.some(plan => plan.isActive);

        if (!hasActivePlan) {
            return res.status(403).json({ success: false, message: 'Member does not have an active membership plan. Attendance cannot be marked.' });
        }

        const date = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

        let attendance = await Attendance.findOne({ member: member._id, date });

        if (!attendance) {
            attendance = new Attendance({
                member: member._id,
                date,
                checkInTimes: [new Date()],
                markedBy: 'qr',
                status: 'present',
            });
        } else {
            attendance.checkInTimes.push(new Date());
            attendance.status = 'present';
            attendance.markedBy = 'qr';
        }

        await attendance.save();

        res.json({ success: true, message: 'Attendance marked successfully', attendance });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ success: false, message: 'Server error while marking attendance' });
    }
};

// POST /api/attendance/manual
export const markManualAttendance = async (req, res) => {
    try {
        const { memberId } = req.body;

        if (!memberId) {
            return res.status(400).json({ success: false, message: 'Member ID is required' });
        }

        const member = await Member.findById(memberId);

        if (!member) {
            return res.status(404).json({ success: false, message: 'Member not found' });
        }

        // Check if member is active
        const hasActivePlan = member.membershipPlans.some(plan => plan.isActive);

        if (!hasActivePlan) {
            return res.status(403).json({ success: false, message: 'Member does not have an active membership plan. Attendance cannot be marked.' });
        }

        const date = new Date().toISOString().split('T')[0];

        let attendance = await Attendance.findOne({ member: memberId, date });

        if (!attendance) {
            attendance = new Attendance({
                member: memberId,
                date,
                checkInTimes: [new Date()],
                markedBy: 'manual',
                status: 'present',
            });
        } else {
            attendance.checkInTimes.push(new Date());
            attendance.markedBy = 'manual';
            attendance.status = 'present';
        }

        await attendance.save();

        res.json({ success: true, message: 'Attendance marked manually', attendance });
    } catch (error) {
        console.error('Error marking manual attendance:', error);
        res.status(500).json({ success: false, message: 'Server error while marking attendance' });
    }
};


export const autoMarkAbsent = async () => {
    const date = new Date().toISOString().split('T')[0];

    const presentIds = await Attendance.find({ date }).distinct('member');

    const allMembers = await Member.find({}, '_id');
    const absentMembers = allMembers.filter(m => !presentIds.includes(m._id.toString()));

    const absentDocs = absentMembers.map(m => ({
        member: m._id,
        date,
        status: 'absent',
        checkInTimes: [],
        markedBy: 'system'
    }));

    await Attendance.insertMany(absentDocs);
    console.log(`✅ Auto-absent marked for ${absentDocs.length} members`);
};
  


export const getAttendanceByMember = async (req, res) => {
    try {
        const { memberId } = req.params;

        // Optionally support query params for date range filtering
        const { startDate, endDate } = req.query;

        const query = { member: memberId };

        if (startDate && endDate) {
            query.date = { $gte: startDate, $lte: endDate };
        }

        const attendanceRecords = await Attendance.find(query).sort({ date: 1 });

        res.status(200).json({ attendance: attendanceRecords });
    } catch (error) {
        console.error('Fetch Attendance Error:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch attendance' });
    }
};





export const getTodayAttendance = async (req, res) => {
    try {
        const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

        const members = await Member.find();
        const todayAttendance = await Attendance.find({ date: today });

        // Map attendance data by member ID
        const attendanceMap = {};
        todayAttendance.forEach((record) => {
            attendanceMap[record.member.toString()] = {
                checkIns: record.checkInTimes || [],
                status: record.status || 'absent',
            };
        });

        // Build response array
        const result = members.map((member) => {
            const attendance = attendanceMap[member._id.toString()];
            return {
                memberId: member._id,
                photoUrl: member.photoUrl || null,
                name: member.fullName,
                phone: member.phone,
                checkIns: attendance?.checkIns || [],
                status: attendance?.status || 'absent',
            };
        });

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching today's attendance:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
  
  
