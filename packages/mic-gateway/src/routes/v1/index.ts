import express from 'express';

import attendee from '@/routes/v1/attendee';
import pickUp from '@/routes/v1/pickUp';
import update from '@/routes/v1/update';

const router = express.Router();
router.use('/attendee', attendee);
router.use('/pick-up', pickUp);
router.use('/update', update);

export default router;
