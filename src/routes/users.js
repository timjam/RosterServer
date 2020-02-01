import express from 'express';
import {
  signUpUser,
  signInUser,
  signOutUser,
} from './usersMethods';

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end('Bad request. Username and password are required');
  }

  try {
    const lastID = await signUpUser(username, password);
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
    const row = await signInUser(username, password);
    res.status(200).end(JSON.stringify(row));
  } catch (error) {
    res.status(400).end(JSON.stringify(error));
  }
});

// TODO: Change this to find by jwt token
userRouter.post('/signout', async (req, res) => {
  const { username, password } = req.body;

  if (!username) {
    res.status(400).end('Bad request. Username is required');
  }

  try {
    const response = await signOutUser(username, password);
    res.status(200).end(JSON.stringify(response));
  } catch (error) {
    res.status(400).end(JSON.stringify(error));
  }
});

export default userRouter;
