import express from 'express';

import { finishPickUpChildren, getPickUpChildren, registerPickUpChildren } from '@/controllers/pickUp';
const router = express.Router();

router.get('/', getPickUpChildren);
router.post('/', registerPickUpChildren);
router.delete('/', finishPickUpChildren);

export default router;
