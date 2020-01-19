import express from 'express';
import { registerUser, findByUsername } from './usersMethods';

const userRouter = express.Router();

userRouter.get('/test', (req, res) => {
  res.status(200).end('Working as intended');
});
userRouter.post('/signup', (req, res) => {
  const { username, password } = req.body;

  console.log({ username, password });
  if (!username || !password) {
    res.status(400).end('Bad request. Username and password are required');
  }

  // TODO: Don't pass res object to registerUser
  registerUser(username, password, res);
});

userRouter.get('/signin', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end('Bad request. Username and password are required');
  }
});

// TODO: Change this to find by jwt token
userRouter.get('/', (req, res) => {
  const { username } = req.body;

  if (!username) {
    res.status(400).end('Bad request. Username is required');
  }
  findByUsername(username, res);
});

export default userRouter;
