/* eslint-disable no-underscore-dangle */
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { RequestWithUser } from '../types/request';

interface Token {
  name?: string,
  email?: string,
  userId: string,
}

const nonAuthPaths = [
  '/user/signup',
  '/user/signin',
];

const authmw = {
  verifyToken: async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    const { originalUrl } = req;
    if (nonAuthPaths.includes(originalUrl)) {
      next();
    } else {
      const header = req.headers.authorization;

      if (header) {
        const bearer = header.split(' ');
        const token = bearer[1];

        if (token) {
          try {
            const secret = process.env.JWT_TOKEN as string;
            const decoded = jwt.verify(token, secret) as Token;
            /**
             * This next line might be redundant, because
             * 1. We might not want to hit the db so that the performance is better
             * 2. userId will be anyway in the token and the token is signed anyway
             *    so if someone had tampered with the payload, the jwt verification
             *    would fail anyway
             */
            const user = await User.query().where({ id: decoded.userId });

            if (!user[0]) {
              res.status(403).end({ message: 'Access denied' });
            } else {
              req.user = { id: decoded.userId };
              next();
            }
          } catch (error) {
            res.status(403).end({ message: 'Access denied' });
          }
        } else {
          res.status(403).end({ message: 'Access denied' });
        }
      } else {
        res.status(403).end({ message: 'Access denied' });
      }

    }
  },
};

export default authmw;
