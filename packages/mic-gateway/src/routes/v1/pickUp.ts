import express from 'express';

import { finishPickUpChildren, getPickUpChildren } from '@/controllers/pickUp';
const router = express.Router();

router.get('/', getPickUpChildren);
router.delete('/:postKey/:commentKey', finishPickUpChildren);

export default router;
