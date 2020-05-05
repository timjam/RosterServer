/**
 * Stub for connect-session-knex types
 * There are not official types yet, so using this to get
 * rid of some tsc errors
 *
 * Must be placed in /node_modules/@types/connect-session-knex/index.d.ts
 * so it will be read by compiler
 *
 */

// declare module 'connect-session-knex' {

//   import * as express from 'express';
//   import * as session from 'express-session';

//   function s(options: (options?: session.SessionOptions) => express.RequestHandler): s.KnexSessionStore;

//   namespace s {
//     interface KnexSessionStore extends session.Store {
//       new (options: KnexStoreOptions): KnexSessionStore;
//     }
//     interface KnexStoreOptions {}
//   }
//   export = s;
// }