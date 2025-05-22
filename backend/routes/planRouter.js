import express from 'express';
import { createPlan, deletePlan, getAllPlans, getPlanById, updatePlan } from '../controller/plancontroller.js';



const router = express.Router();

router.post('/', createPlan);
router.get('/', getAllPlans);
router.get('/:planId', getPlanById);
router.put('/:planId', updatePlan);
router.delete('/:planId', deletePlan);

export default router;
