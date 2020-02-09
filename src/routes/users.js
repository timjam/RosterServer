import express from 'express';
import User from '../db/controllers/users';
import Auth from '../helpers/auth';

const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end(JSON.stringify({ message: 'Bad request. Username and password are required' }));
  }

  const hashedPassword = Auth.hashPassword(password);

  try {
    const { rows } = await User.create(username, hashedPassword);
    res.status(200).end(JSON.stringify(rows));
  } catch (error) {
    const { name, code, detail } = error;
    res.status(400).end(JSON.stringify({ name, code, detail }));
  }
});

userRouter.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).end(JSON.stringify({ message: 'Username and password are required' }));
  }

  try {
    const { rows } = await User.getOneByName(username);
    if (!rows[0]) {
      res.status(401).end(JSON.stringify({ message: 'Invalid credentials' }));
    }
    if (!Auth.comparePassword(password, rows[0].password)) {
      res.status(401).end(JSON.stringify({ message: 'Invalid credentials' }));
    }
    const token = Auth.generateToken(rows[0].id);
    res.status(200).end(JSON.stringify({ jwt: token }));
  } catch (error) {
    res.status(400).end(JSON.stringify(error));
  }
});

// TODO: Change this to find by jwt token
userRouter.post('/signout', async (req, res) => {
  // const { username, password } = req.body;
  const { username } = req.body;

  if (!username) {
    res.status(400).end('Bad request. Username is required');
  }

  try {
    // const response = await signOutUser(username, password);
    const response = '';
    res.status(200).end(JSON.stringify(response));
  } catch (error) {
    res.status(400).end(JSON.stringify(error));
  }
});

export default userRouter;
