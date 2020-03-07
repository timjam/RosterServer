import express from 'express';
import morgan from 'morgan';
import Knex from 'knex';
import { Model } from 'objection';

import authmw from './middlewares/authmw';
import errorHandler from './middlewares/errorHandler';

import usersRouter from './routes/userRoutes';

import knexfile from '../knex/knexfile';

// Init Knex
const knex = Knex(knexfile.development);
knex.migrate.latest();

// Bind the knex instance to Model base class
Model.knex(knex);

const app = express();
const { SERVER_PORT } = process.env;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(authmw.verifyToken);

app.use('/user', usersRouter);

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  // console.log(`Server now listening on port ${SERVER_PORT}`);
});
