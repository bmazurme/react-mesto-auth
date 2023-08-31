import { Router } from 'express';

import authRoute from './auth-route';

// import authMiddleware from '../middlewares/auth-middleware';

const router = Router();

router.use('/', authRoute);

export default router;
