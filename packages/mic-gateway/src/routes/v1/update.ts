import express from 'express';

import { update } from '@/controllers/update';
const router = express.Router();

router.post('/', update);

export default router;
