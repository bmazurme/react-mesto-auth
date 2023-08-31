/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { UnauthorizedError } from '../errors';
// import DEV_JWT_SECRET from '../../utils/dev-config';

type TypeUser = {
  defaultEmail: string;
};

const authMiddleware = (req: any, _res: Response, next: NextFunction) => {
  const { token } = req.cookies as unknown as Record<string, string>;
  const DEV_JWT_SECRET = 'DEV_JWT_SECRET';
  // const { JWT_SECRET, NODE_ENV } = process.env;

  if (!token) {
    throw new UnauthorizedError();
  }

  let payload;

  try {
    payload = jwt.verify(token, DEV_JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError();
  }

  req.user = payload as TypeUser;

  next();
};

export default authMiddleware;
