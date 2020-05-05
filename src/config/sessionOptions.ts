import uuidv1 from 'uuid';
import { createHash, randomBytes } from 'crypto';
import { KnexSessionStore } from 'connect-session-knex';

const sessionOptions = (store: KnexSessionStore, isDev: boolean, secret?: string) => {
  const domain = isDev ? '127.0.0.1:4500' : 'NOT KNOWN YET';
  return {
    secret: secret || 'super-secret',
    store,
    resave: true,
    saveUninitialized: false,
    // Generate unique ids that does not collide
    genid: () => createHash('sha256').update(uuidv1()).update(randomBytes(256)).digest('hex'),
    cookie: {
      // One week
      maxAge: 1000*3600*24*7,
      secure: !isDev,
      httpOnly: !isDev,
      domain
    }
  };
};

export default sessionOptions;