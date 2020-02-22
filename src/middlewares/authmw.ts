/* eslint-disable no-underscore-dangle */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../db/controllers/users';

interface RequestWithUser extends Request {
  user?: object,
}

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
  verifyToken: async (req: RequestWithUser, res: Response, next: NextFunction) => {
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
            const { rows } = await User.getOne(decoded.userId);

            if (!rows[0]) {
              res.status(403).end({ message: 'Access denied' });
            }
            req.user = { id: decoded.userId };
            next();
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
