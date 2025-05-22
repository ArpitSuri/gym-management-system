import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import Member from "../models/memberModel.js";


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const seedAttendance = async () => {
    try {
        const members = await Member.find().limit(10);

        if (members.length < 10) {
            console.log('Need at least 10 members to seed attendance.');
            return;
        }

        const attendanceData = [
            {
                member: members[0]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [new Date("2025-05-20T08:00:00Z")],
                status: "present",
                markedBy: "qr"
            },
            {
                member: members[1]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [],
                status: "absent",
                markedBy: "manual"
            },
            {
                member: members[2]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [new Date("2025-05-20T07:30:00Z"), new Date("2025-05-20T11:00:00Z")],
                status: "present",
                markedBy: "manual"
            },
            {
                member: members[3]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [new Date("2025-05-20T08:15:00Z")],
                status: "present",
                markedBy: "qr"
            },
            {
                member: members[4]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [new Date("2025-05-20T07:50:00Z")],
                status: "present",
                markedBy: "manual"
            },
            {
                member: members[5]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [],
                status: "absent",
                markedBy: "manual"
            },
            {
                member: members[6]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [new Date("2025-05-20T08:10:00Z")],
                status: "present",
                markedBy: "qr"
            },
            {
                member: members[7]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [new Date("2025-05-20T07:30:00Z"), new Date("2025-05-20T12:00:00Z")],
                status: "present",
                markedBy: "manual"
            },
            {
                member: members[8]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [new Date("2025-05-20T09:00:00Z")],
                status: "present",
                markedBy: "qr"
            },
            {
                member: members[9]._id,
                date: new Date("2025-05-20"),
                checkInTimes: [],
                status: "absent",
                markedBy: "manual"
            }
        ];

        await Attendance.deleteMany({ date: new Date("2025-05-20") }); // prevent duplicates
        await Attendance.insertMany(attendanceData);

        console.log('✅ Attendance data seeded successfully!');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

connectDB().then(seedAttendance);
