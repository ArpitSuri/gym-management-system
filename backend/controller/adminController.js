import Member from "../models/memberModel.js";
import Attendance from "../models/attendanceModel.js";
export const getDashboardStats = async (req, res) => {
    try {
        // Total Members count
        const totalMembers = await Member.countDocuments();

        // Active Memberships count (active plans for members)
        // Assuming membershipPlans array in Member schema
        // and membershipPlan.isActive flag is set properly
        const activeMemberships = await Member.countDocuments({
            'membershipPlans.isActive': true
        });

        // Today's date string in 'YYYY-MM-DD' format
        const today = new Date().toISOString().split('T')[0];

        // Count of attendance records marked present today
        const todayAttendance = await Attendance.countDocuments({
            date: today,
            status: 'present'
        });

        // Absentees = totalMembers - todayAttendance
        const absentees = totalMembers - todayAttendance;

        res.json({
            totalMembers,
            activeMemberships,
            todayAttendance,
            absentees
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
};
