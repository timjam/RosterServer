import express from 'express';
import morgan from 'morgan';
import usersRouter from './routes/users';
import config from './configs/config';
import { initDB } from './configs/connectionManager';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', usersRouter);
initDB();

app.listen(config.SERVER_PORT, () => {
  console.log(`Server now listening on port ${config.SERVER_PORT}`);
});
