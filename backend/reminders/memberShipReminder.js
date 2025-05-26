import cron from "node-cron";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import Member from "../models/memberModel.js"; // Adjust the path as needed

dotenv.config();

// Email setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// 🕗 Runs every day at 8 AM
cron.schedule("0 8 * * *", async () => {
    console.log("🔁 Running membership expiry check...");

    try {
        const today = new Date();
        const reminderWindow = [1, 2, 3]; // Send reminder if plan expires in 1-3 days

        const members = await Member.find({});

        for (const member of members) {
            for (const plan of member.membershipPlans) {
                if (!plan.endDate || !plan.isActive) continue;

                const endDate = new Date(plan.endDate);
                const diffDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));

                if (reminderWindow.includes(diffDays)) {
                    const emailContent = `
                        Hi ${member.fullName},<br><br>
                        Your gym membership is expiring on <b>${endDate.toDateString()}</b>.<br>
                        Please renew it in time to avoid interruption.<br><br>
                        Regards,<br><b>Team FitGym</b>`;

                    await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: member.email,
                        subject: "Membership Expiry Reminder",
                        html: emailContent
                    });

                    console.log(`📧 Reminder email sent to ${member.fullName}`);
                }
            }
        }

    } catch (err) {
        console.error("❌ Error in membership reminder job:", err);
    }
});
