import express from 'express';
import morgan from 'morgan';
import Knex from 'knex';
import session from 'express-session';
import connectKnex from 'connect-session-knex';
import { Model } from 'objection';

// Configs
import sessionOptions from './config/sessionOptions';
import knexfile from '../knex/knexfile';

// Middlewares
import authmw from './middlewares/authmw';
import errorHandler from './middlewares/errorHandler';

// Routers
import usersRouter from './routes/userRoutes';

// Constants
const {
  SERVER_PORT,
  NODE_ENV,
  SESSION_SECRET,
} = process.env;

const IS_DEV = NODE_ENV === 'development';


// Init Knex
const knex = Knex(knexfile.development);
knex.migrate.latest();

// Bind the knex instance to Model base class
Model.knex(knex);

// Connect Knex to session and create session store
const KnexSessionStore = connectKnex(session);
const store = new KnexSessionStore({
  knex,
  tablename: 'sessions'
});


const app = express();
// + is unary operator and converts true to 1 and false to 0
app.set('trust_proxy', + !IS_DEV);
app
  .use(session(sessionOptions(store, IS_DEV, SESSION_SECRET)))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use(morgan('dev'))
  .use(authmw.verifyToken);

app.use('/user', usersRouter);

app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  console.log(`Server now listening on port ${SERVER_PORT}`);
});
