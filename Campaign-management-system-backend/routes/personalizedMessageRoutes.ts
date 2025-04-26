
import express from 'express';
import { generatePersonalizedMessage } from '../controllers/personalizedMessageController';

const router = express.Router();


router.post('/', generatePersonalizedMessage);

export default router;
