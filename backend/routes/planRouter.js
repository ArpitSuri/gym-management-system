import express from 'express';
import { addPlanToMember, createPlan, deletePlan, getAllPlans, getPlanById, updatePlan } from '../controller/plancontroller.js';



const router = express.Router();

router.post('/', createPlan);
router.get('/', getAllPlans);
router.get('/:planId', getPlanById);
router.put('/:planId', updatePlan);
router.delete('/:planId', deletePlan);
// routes/memberRoutes.js or similar
router.post("/:memberId/add-plan", addPlanToMember);


export default router;
