// models/Plan.js
import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
});

const Plan = mongoose.model('Plan', planSchema);
export default Plan;
