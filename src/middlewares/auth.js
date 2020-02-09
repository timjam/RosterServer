/* eslint-disable no-underscore-dangle */
import jwt from 'jsonwebtoken';
import User from '../db/controllers/users';

const nonAuthPaths = [
  '/user/signup',
  '/user/signin',
];

const authmw = {
  verifyToken: async (req, res, next) => {
    const { pathname } = req._parsedUrl;
    if (nonAuthPaths.includes(pathname)) {
      next();
    } else {
      const token = req.headers['x-access-token'];

      if (!token) {
        res.status(400).end({ message: 'Access denied' });
      }

      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const { rows } = await User.getOne(decoded.userId);

        if (!rows[0]) {
          res.status(400).end({ message: 'Access denied' });
        }
        req.user = { id: decoded.userId };
        next();
      } catch (error) {
        res.status(400).end({ message: 'Access denied' });
      }
    }
  },
};

export default authmw;
