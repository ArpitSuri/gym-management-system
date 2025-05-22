import Member from "../models/memberModel.js";
import Plan from "../models/planModel.js"; 


export const registerMember = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            gender,
            dateOfBirth,
            address,
            emergencyContact,
            membershipPlan
        } = req.body;

        // Check if email or phone exists (as before)
        const emailExists = await Member.findOne({ email });
        if (emailExists) return res.status(400).json({ error: 'Email already exists' });

        const phoneExists = await Member.findOne({ phone });
        if (phoneExists) return res.status(400).json({ error: 'Phone already exists' });

        // 🔹 Get photo URL from Cloudinary
        const photoUrl = req.file?.path || '';

        const newMember = new Member({
            fullName,
            email,
            phone,
            gender,
            dateOfBirth,
            address,
            photoUrl,
            emergencyContact,
            membershipPlans: [membershipPlan]
        });

        await newMember.save();

        res.status(201).json({
            message: 'Member registered successfully',
            member: newMember
        });
    } catch (error) {
        console.error('Register Member Error:', error);
        res.status(500).json({ error: error.message || 'Failed to register member' });
    }
};
  



export const updateMemberProfile = async (req, res) => {
    try {
        const { memberId } = req.params;
        const updates = req.body;

        const updatedMember = await Member.findByIdAndUpdate(
            memberId,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedMember) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.status(200).json({
            message: 'Member profile updated successfully',
            member: updatedMember
        });
    } catch (error) {
        console.error('Update Member Error:', error);
        res.status(500).json({ error: error.message || 'Failed to update member' });
    }
};



export const viewMemberProfile = async (req, res) => {
    try {
        const { memberId } = req.params;

        const member = await Member.findById(memberId).populate('membershipPlans.planId');

        if (!member) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.status(200).json({ member });
    } catch (error) {
        console.error('View Member Error:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch member profile' });
    }
};



export const deleteMemberProfile = async (req, res) => {
    try {
        const { memberId } = req.params;

        const deletedMember = await Member.findByIdAndDelete(memberId);

        if (!deletedMember) {
            return res.status(404).json({ error: 'Member not found' });
        }

        res.status(200).json({
            message: 'Member deleted successfully',
            member: deletedMember
        });
    } catch (error) {
        console.error('Delete Member Error:', error);
        res.status(500).json({ error: error.message || 'Failed to delete member' });
    }
};




export const getAllMembers = async (req, res) => {
    try {
        const members = await Member.find().populate('membershipPlans.planId');

        res.status(200).json({
            count: members.length,
            members
        });
    } catch (error) {
        console.error('Get All Members Error:', error);
        res.status(500).json({ error: error.message || 'Failed to fetch members' });
    }
};
