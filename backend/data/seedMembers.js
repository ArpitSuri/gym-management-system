import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import Member from "../models/memberModel.js";
import Plan from "../models/planModel.js";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ Connection failed:", error);
        process.exit(1);
    }
};

const seedMembers = async () => {
    try {
        const plans = await Plan.find();
        if (plans.length === 0) {
            console.log("❌ No plans found. Seed plans first.");
            return;
        }

        const sampleMembers = [
            {
                fullName: "Aryan Sharma",
                email: "aryan.sharma@example.com",
                phone: "9000011111",
                gender: "Male",
                dateOfBirth: new Date("1998-03-15"),
                address: "Delhi, India",
                joinDate: new Date("2025-05-01"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[0]._id,
                    startDate: new Date("2025-05-01"),
                    option: "monthly"
                }],
                emergencyContact: {
                    name: "Raj Sharma",
                    phone: "9999999999",
                    relationship: "Father"
                }
            },
            {
                fullName: "Sakshi Mehta",
                email: "sakshi.mehta@example.com",
                phone: "9000022222",
                gender: "Female",
                dateOfBirth: new Date("1996-07-25"),
                address: "Mumbai, India",
                joinDate: new Date("2025-05-03"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[1 % plans.length]._id,
                    startDate: new Date("2025-05-03"),
                    option: "quarterly"
                }],
                emergencyContact: {
                    name: "Anita Mehta",
                    phone: "9888888888",
                    relationship: "Mother"
                }
            },
            {
                fullName: "Rahul Verma",
                email: "rahul.verma@example.com",
                phone: "9000033333",
                gender: "Male",
                dateOfBirth: new Date("1992-11-30"),
                address: "Bangalore, India",
                joinDate: new Date("2025-05-04"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[2 % plans.length]._id,
                    startDate: new Date("2025-05-04"),
                    option: "halfmonth"
                }],
                emergencyContact: {
                    name: "Suresh Verma",
                    phone: "9777777777",
                    relationship: "Brother"
                }
            },
            {
                fullName: "Neha Kapoor",
                email: "neha.kapoor@example.com",
                phone: "9000044444",
                gender: "Female",
                dateOfBirth: new Date("1995-05-10"),
                address: "Chandigarh, India",
                joinDate: new Date("2025-05-05"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[3 % plans.length]._id,
                    startDate: new Date("2025-05-05"),
                    option: "monthly"
                }],
                emergencyContact: {
                    name: "Amit Kapoor",
                    phone: "9666666666",
                    relationship: "Husband"
                }
            },
            {
                fullName: "Kabir Singh",
                email: "kabir.singh@example.com",
                phone: "9000055555",
                gender: "Male",
                dateOfBirth: new Date("1988-09-19"),
                address: "Hyderabad, India",
                joinDate: new Date("2025-05-06"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[4 % plans.length]._id,
                    startDate: new Date("2025-05-06"),
                    option: "halfyear"
                }],
                emergencyContact: {
                    name: "Preeti Singh",
                    phone: "9555555555",
                    relationship: "Wife"
                }
            },
            {
                fullName: "Aanya Rathi",
                email: "aanya.rathi@example.com",
                phone: "9000066666",
                gender: "Female",
                dateOfBirth: new Date("2001-02-20"),
                address: "Pune, India",
                joinDate: new Date("2025-05-07"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[5 % plans.length]._id,
                    startDate: new Date("2025-05-07"),
                    option: "monthly"
                }],
                emergencyContact: {
                    name: "Reema Rathi",
                    phone: "9444444444",
                    relationship: "Mother"
                }
            },
            {
                fullName: "Rohan Khurana",
                email: "rohan.khurana@example.com",
                phone: "9000077777",
                gender: "Male",
                dateOfBirth: new Date("1990-06-10"),
                address: "Kolkata, India",
                joinDate: new Date("2025-05-08"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[6 % plans.length]._id,
                    startDate: new Date("2025-05-08"),
                    option: "yearly"
                }],
                emergencyContact: {
                    name: "Vijay Khurana",
                    phone: "9333333333",
                    relationship: "Father"
                }
            },
            {
                fullName: "Simran Jain",
                email: "simran.jain@example.com",
                phone: "9000088888",
                gender: "Female",
                dateOfBirth: new Date("1997-10-05"),
                address: "Ahmedabad, India",
                joinDate: new Date("2025-05-09"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[7 % plans.length]._id,
                    startDate: new Date("2025-05-09"),
                    option: "quarterly"
                }],
                emergencyContact: {
                    name: "Deepak Jain",
                    phone: "9222222222",
                    relationship: "Father"
                }
            },
            {
                fullName: "Aditya Mehra",
                email: "aditya.mehra@example.com",
                phone: "9000099999",
                gender: "Male",
                dateOfBirth: new Date("1993-12-01"),
                address: "Lucknow, India",
                joinDate: new Date("2025-05-10"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[8 % plans.length]._id,
                    startDate: new Date("2025-05-10"),
                    option: "monthly"
                }],
                emergencyContact: {
                    name: "Naina Mehra",
                    phone: "9111111111",
                    relationship: "Wife"
                }
            },
            {
                fullName: "Tanya Roy",
                email: "tanya.roy@example.com",
                phone: "9000000000",
                gender: "Female",
                dateOfBirth: new Date("1999-01-15"),
                address: "Jaipur, India",
                joinDate: new Date("2025-05-11"),
                photoUrl: "",
                membershipPlans: [{
                    planId: plans[9 % plans.length]._id,
                    startDate: new Date("2025-05-11"),
                    option: "halfmonth"
                }],
                emergencyContact: {
                    name: "Kunal Roy",
                    phone: "9000000001",
                    relationship: "Brother"
                }
            }
        ];

        await Member.deleteMany(); // optional: clear existing
        await Member.insertMany(sampleMembers);

        console.log("✅ Seeded 10 members successfully!");
        process.exit();
    } catch (error) {
        console.error("❌ Seeding failed:", error);
        process.exit(1);
    }
};

connectDB().then(seedMembers);
