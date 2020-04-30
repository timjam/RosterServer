import { Request, Response } from 'express';
import promiseRouter from 'express-promise-router';
import User from './../models/user';
import Crypto from './../services/cryptoService';
import { BadRequestError } from '../services/HttpErrors';

/**
 * NOTE: All error handling is done at the errorHandler middleware!
 *       Keep routes clean from handling errors that may arise from
 *       database queries. Just make sure that all errortypes are
 *       caught in the errorHandler.
 */

const userRouter = promiseRouter();

userRouter.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const hash = Crypto.hashPassword(password);

  const { id } = await User.query().insert({ username, hash });
  res.send({ id });
});

userRouter.post('/signin', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await User.query().where({ username }).first();

  if (!user || !Crypto.comparePassword(password, user.hash)) {
    throw new BadRequestError('Invalid username or password');
  } else {
    req.session!.key = user.id;

    res.send({
      sessionID: req.sessionID,
      session: req.session,
      requestHeaders: req.headers,
      responseHeaders: res.getHeaders(),
    });
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

export default userRouter;