import express from 'express';
import {
  registerUser,
  findByUsername,
  signInUser,
} from './usersMethods';

const userRouter = express.Router();

userRouter.get('/test', (req, res) => {
  res.status(200).end('Working as intended');
});

userRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end('Bad request. Username and password are required');
  }

  try {
    const lastID = await registerUser(username, password);
    res.status(200).end(JSON.stringify(lastID));
  } catch (error) {
    res.status(400).end(JSON.stringify(error));
  }
});

userRouter.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end('Bad request. Username and password are required');
  }

  try {
    const someToken = await signInUser(username, password);
    res.status(200).end(JSON.stringify(`Success ${someToken}`));
  } catch (error) {
    res.status(400).end(JSON.stringify(error));
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
