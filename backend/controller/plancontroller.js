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
