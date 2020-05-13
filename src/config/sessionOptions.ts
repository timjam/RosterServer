import uuidv1 from 'uuid';
import { createHash, randomBytes } from 'crypto';
import { KnexSessionStore } from 'connect-session-knex';

const sessionOptions = (sessStore: KnexSessionStore, inProd: boolean) => {

  const {
    SESS_NAME = 'sid',
    SESS_SECRET = 'super_secret',
    SESS_LIFETIME = 7*24*3600*1000,
  } = process.env;

  return {
    name: SESS_NAME,
    secret: SESS_SECRET,
    store: sessStore,
    resave: false,
    saveUninitialized: false,
    // Generate unique ids that does not collide
    genid: () => createHash('sha256').update(uuidv1()).update(randomBytes(256)).digest('hex'),
    cookie: {
      maxAge: SESS_LIFETIME as number,
      secure: inProd,
      sameSite: inProd ? true : 'none' as 'none',
      httpOnly: inProd,
      path: '/'
    }
  };
};

export default sessionOptions;