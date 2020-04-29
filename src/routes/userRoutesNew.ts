import { Request, Response } from 'express';
import promiseRouter from 'express-promise-router';
import User from './../models/user';
import Crypto from './../services/cryptoService';

const userRouter = promiseRouter();

userRouter.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // try {
  const hash = Crypto.hashPassword(password);
  const { id } = await User.query().insert({ username, hash });
  res.send({ id });
  // } catch (error) {
  //   throw error;
  // }
});

userRouter.post('/signin', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // try {
  const user = await User.query().where({ username }).first();

  if (!Crypto.comparePassword(password, user.hash)) {
    throw new Error('Invalid username or password');
  }

  // Generate session and session cookie
  // const token = Crypto.generateToken(user.id);

  // Send session cookie
});

userRouter.post('/signout', async (req: Request, res: Response) => {
  // 1. Get session cookie from request
  // 2. Delete session
  // 3. Redirect to login page or some other start page
});