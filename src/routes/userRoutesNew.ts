import { Request, Response } from 'express';
import promiseRouter from 'express-promise-router';
import { body } from 'express-validator';
import User from './../models/user';
import Crypto from './../services/cryptoService';
import { BadRequestError } from '../services/HttpErrors';
import knex from 'knex';

/**
 * NOTE: All error handling is done at the errorHandler middleware!
 *       Keep routes clean from handling errors that may arise from
 *       database queries. Just make sure that all errortypes are
 *       caught in the errorHandler.
 */

const userRouter = promiseRouter();

userRouter.post('/signup', [
  body('username', 'Username is required').exists(),
  body('password', 'Password is required').exists()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('confirmPassword', 'Passwords do not match')
    .exists()
    .custom((value, { req }) => value === req.body.password),
], async (req: Request, res: Response) => {

  const { username, password } = req.body;
  const hash = Crypto.hashPassword(password);

  const { id } = await User.query().insert({ username, hash });
  res.send({ id });
});

userRouter.post('/signin', [
  body('username').exists(),
  body('password').exists(),
], async (req: Request, res: Response) => {
  console.log(req.session);
  const { username, password } = req.body;

  const user = await User.query().where({ username }).first();

  if (!user || !Crypto.comparePassword(password, user.hash)) {
    throw new BadRequestError('Invalid username or password');
  } else {
    req.session!.userId = user.id;
    res.send({ auth: 'success' });
  }
});

userRouter.get('/signout', async (req: Request, res: Response) => {
  console.log(req.session);
  req.session?.destroy((error) => {
    if (error) {
      console.log(error);
    } else {
      res.redirect('/');
    }
  });
  // 1. Get session cookie from request
  // 2. Delete session
  // 3. Redirect to login page or some other start page
});

export default userRouter;