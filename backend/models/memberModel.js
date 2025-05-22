import mongoose from "mongoose";



const membershipPlanSchema = new mongoose.Schema({
    planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    option: {
        type: String,
        enum: ['halfmonth', 'monthly', 'quarterly', 'halfyear', 'yearly'],
        required: true
    },
    isActive: { type: Boolean, default: false }
});

// 🔧 Pre-save hook to auto-calculate `endDate`
membershipPlanSchema.pre('save', function (next) {
    if (!this.startDate || !this.option) return next();

    const start = new Date(this.startDate);
    let end = new Date(start);

    switch (this.option) {
        case 'halfmonth':
            end.setDate(end.getDate() + 15);
            break;
        case 'monthly':
            end.setMonth(end.getMonth() + 1);
            break;
        case 'quarterly':
            end.setMonth(end.getMonth() + 3);
            break;
        case 'halfyear':
            end.setMonth(end.getMonth() + 6);
            break;
        case 'yearly':
            end.setFullYear(end.getFullYear() + 1);
            break;
        default:
            return next(new Error('Invalid option value'));
    }

    this.endDate = end;
    next();
});

const memberSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    dateOfBirth: { type: Date },
    address: { type: String },
    joinDate: { type: Date, default: Date.now },
    photoUrl: { type: String }, // Cloudinary or local storage

    membershipPlans: [membershipPlanSchema],

    emergencyContact: {
        name: String,
        phone: String,
        relationship: String
    }
});
const Member = mongoose.model('Member', memberSchema);
export default Member;