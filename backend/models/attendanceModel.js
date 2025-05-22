// models/Attendance.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  date: { type: String, required: true }, // YYYY-MM-DD
  checkInTimes: [{ type: Date }], // allows multiple check-ins
  status: { type: String, enum: ['present', 'absent'], default: 'absent' },
  markedBy: { type: String, enum: ['qr', 'manual'], required: true },
}, { timestamps: true });

attendanceSchema.index({ member: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
