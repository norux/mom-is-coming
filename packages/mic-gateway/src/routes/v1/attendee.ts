import express from 'express';

import { getAttendee } from '@/controllers/attendee';
const router = express.Router();

router.get('/', getAttendee);

export default router;
