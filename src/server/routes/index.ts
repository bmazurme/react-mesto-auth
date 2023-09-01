import { Router } from 'express';

import authRoute from './auth-route';
import oauthRoute from './oauth-route';
import cardRoute from './card-route';

import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.use('/', authRoute);
router.use('/', oauthRoute);
router.use('/', authMiddleware, cardRoute);

export default router;
