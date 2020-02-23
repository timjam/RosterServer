import express, { Request, Response } from 'express';
import User from '../db/controllers/users';
import Crypto from '../services/cryptoService';
import { QueryResult } from 'pg';
import { RequestWithUser } from '../types/request';

const userRouter = express.Router();

userRouter.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end(JSON.stringify(
      { message: 'Bad request. Username and password are required' }));
  }

  const hashedPassword = Crypto.hashPassword(password);

  try {
    const { rows } = await User.create(username, hashedPassword) as QueryResult;
    res.status(200).end(JSON.stringify({ rows }));
  } catch (error) {
    const { name, code, detail } = error;
    res.status(400).end(JSON.stringify({ name, code, detail }));
  }
});

userRouter.post('/signin', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end(JSON.stringify({ message: 'Username and password are required' }));
  }

  try {
    const { rows } = await User.getOneByName(username) as QueryResult;
    if (!rows[0]) {
      res.status(401).end(JSON.stringify({ message: 'Invalid credentials' }));
    }

    if (!Crypto.comparePassword(password, rows[0].password)) {
      res.status(401).end(JSON.stringify({ message: 'Invalid credentials' }));
    } else {
      const token = Crypto.generateToken(rows[0].id);
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
