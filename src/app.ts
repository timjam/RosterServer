import express from 'express';
import morgan from 'morgan';
import Knex from 'knex';
import usersRouter from './routes/userRoutes';
import authmw from './middlewares/authmw';
import knexfile from '../knex/knexfile';

// Init Knex
const knex = Knex(knexfile.development);
knex.migrate.latest();

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
