import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import Crypto from '../services/cryptoService';
import { RequestWithUser } from '../types/request';
import promiseRouter from 'express-promise-router';
import { BadRequestError } from '../services/HttpErrors';

const userRouter = promiseRouter();

userRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end(JSON.stringify(
      { message: 'Bad request. Username and password are required' }));
  }

  try {
    const hash = Crypto.hashPassword(password);
    /**
     * Okay this is a problem. This insert throws an error from
     * pg and the error is catched by the promiserouter if this is not wrapped
     * into try/catch. However the point of using promise router was to get
     * rid of try catches here and instead let the promiserouter handle the catch
     */
    const id = await User.query().insert({ username, hash });
    res.send({ id });
  } catch {
    throw new BadRequestError('Username already exists');
  }
});

userRouter.post('/signin', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end(JSON.stringify({ message: 'Username and password are required' }));
  }

  try {
    const user = await User.query().where({ username });
    if (!user) {
      res.status(401).end(JSON.stringify({ message: 'Invalid credentials' }));
    }

    if (!Crypto.comparePassword(password, user[0].hash)) {
      res.status(401).end(JSON.stringify({ message: 'Invalid credentials' }));
    } else {
      const token = Crypto.generateToken(user[0].id);
      res.status(200).end(JSON.stringify({ jwt: token }));
    }
  } catch (error) {
    res.status(400).end(JSON.stringify({ error }));
  }
});

// TODO: Change this to find by jwt token
userRouter.post('/signout', async (req: RequestWithUser, res: Response) => {
  // const { username, password } = req.body;
  const { username } = req.body;
  const { user } = req;

  if (!username) {
    res.status(400).end('Bad request. Username is required');
  }

  try {
    // const response = await signOutUser(username, password);
    const response = '';
    res.status(200).end(JSON.stringify({ response }));
  } catch (error) {
    res.status(400).end(JSON.stringify({ error }));
  }
});

export default userRouter;
