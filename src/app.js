import express from 'express';
import morgan from 'morgan';
import usersRouter from './routes/users';
import authmw from './middlewares/auth';

const app = express();
const { SERVER_PORT } = process.env;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authmw.verifyToken);

app.use('/user', usersRouter);

app.listen(SERVER_PORT, () => {
  console.log(`Server now listening on port ${SERVER_PORT}`);
});
