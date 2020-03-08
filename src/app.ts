import express from 'express';
import morgan from 'morgan';
import Knex from 'knex';
import { Model } from 'objection';
// import promiseRouter from 'express-promise-router';

import authmw from './middlewares/authmw';
import errorHandler from './middlewares/errorHandler';

import usersRouter from './routes/userRoutes';

import knexfile from '../knex/knexfile';

// Init Knex
const knex = Knex(knexfile.development);
knex.migrate.latest();

// Bind the knex instance to Model base class
Model.knex(knex);

const { SERVER_PORT } = process.env;

// tslint:disable-next-line: no-var-requires
// const promiseRouter = require('express-promise-router')();
const app = express()
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(morgan('dev'))
  .use(authmw.verifyToken);
  // .use(promiseRouter);

// usersRouter(promiseRouter);
app.use('/user', usersRouter);

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  // console.log(`Server now listening on port ${SERVER_PORT}`);
});
