import express from 'express';
import { deleteMemberProfile, getAllMembers, registerMember, updateMemberProfile, viewMemberProfile } from '../controller/memberController.js';
import upload from '../middleWare/upload.js';


const router = express.Router();

router.post('/register', upload.single("photo") ,registerMember);
router.get('/:memberId', viewMemberProfile);
router.put('/:memberId', updateMemberProfile);
router.delete('/:memberId', deleteMemberProfile);
router.get('/', getAllMembers); // 🔹 Get all members

export default router;
