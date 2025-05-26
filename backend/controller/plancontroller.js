import Plan from "../models/planModel.js";

// ✅ Create a new plan
export const createPlan = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        if (!name || !price) {
            return res.status(400).json({ error: "Name and price are required." });
        }

        const newPlan = new Plan({ name, price, description });
        await newPlan.save();

        res.status(201).json({
            message: "Plan created successfully",
            plan: newPlan
        });
    } catch (error) {
        console.error("Create Plan Error:", error);
        res.status(500).json({ error: error.message || "Failed to create plan" });
    }
};

// ✅ Get all plans
export const getAllPlans = async (req, res) => {
    try {
        const plans = await Plan.find();
        res.status(200).json({ plans });
    } catch (error) {
        console.error("Fetch Plans Error:", error);
        res.status(500).json({ error: error.message || "Failed to fetch plans" });
    }
};

// ✅ Get a single plan by ID
export const getPlanById = async (req, res) => {
    try {
        const { planId } = req.params;

        const plan = await Plan.findById(planId);
        if (!plan) {
            return res.status(404).json({ error: "Plan not found" });
        }

        res.status(200).json({ plan });
    } catch (error) {
        console.error("Fetch Plan Error:", error);
        res.status(500).json({ error: error.message || "Failed to fetch plan" });
    }
};

// ✅ Update a plan
export const updatePlan = async (req, res) => {
    try {
        const { planId } = req.params;
        const updates = req.body;

        const updatedPlan = await Plan.findByIdAndUpdate(planId, updates, {
            new: true,
            runValidators: true
        });

        if (!updatedPlan) {
            return res.status(404).json({ error: "Plan not found" });
        }

        res.status(200).json({
            message: "Plan updated successfully",
            plan: updatedPlan
        });
    } catch (error) {
        console.error("Update Plan Error:", error);
        res.status(500).json({ error: error.message || "Failed to update plan" });
    }
};

// ✅ Delete a plan
export const deletePlan = async (req, res) => {
    try {
        const { planId } = req.params;

        const deletedPlan = await Plan.findByIdAndDelete(planId);

        if (!deletedPlan) {
            return res.status(404).json({ error: "Plan not found" });
        }

        res.status(200).json({
            message: "Plan deleted successfully",
            plan: deletedPlan
        });
    } catch (error) {
        console.error("Delete Plan Error:", error);
        res.status(500).json({ error: error.message || "Failed to delete plan" });
    }
};

import Member from "../models/memberModel.js";
import nodemailer from "nodemailer";
import { getPlanAddedEmail } from "../reminders/emailTemplates.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const addPlanToMember = async (req, res) => {
    try {
        const { memberId } = req.params;
        const { planId, startDate, option } = req.body;

        if (!planId || !startDate || !option) {
            return res.status(400).json({ error: "PlanId, startDate and option are required" });
        }

        const member = await Member.findById(memberId);
        if (!member) return res.status(404).json({ error: "Member not found" });

        // Optional: Check if all existing plans are expired or inactive
        // You can customize this logic as needed
        const activePlan = member.membershipPlans.find(plan => plan.isActive);
        if (activePlan) {
            return res.status(400).json({ error: "Member already has an active plan" });
        }

        // Add new plan
        const newMembershipPlan = {
            planId,
            startDate,
            option,
            isActive: true,
        };

        member.membershipPlans.push(newMembershipPlan);
        await member.save();

        // Send plan-added email notification
        const { subject, html } = getPlanAddedEmail(member.fullName, option, new Date(startDate));
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: member.email,
            subject,
            html,
        });

        res.status(200).json({ message: "New plan added and email sent", member });
    } catch (error) {
        console.error("Add Plan Error:", error);
        res.status(500).json({ error: error.message || "Failed to add plan" });
    }
};
