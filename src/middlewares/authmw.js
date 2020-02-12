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
      const header = req.headers.authorization;

      if (header) {
        const bearer = header.split(' ');
        const token = bearer[1];

        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
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
    }
  },
};

export default authmw;
