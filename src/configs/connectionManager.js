import sqlite3 from 'sqlite3';
import config from './config';
import usersSchema from '../db/rosterSchema';

// Transform to a class?
const errorCallback = (error) => {
  if (error) {
    console.log(error);
  }
};

const openDB = () => new sqlite3.Database(process.env.DB_PATH, errorCallback);

const initDB = () => openDB().exec(usersSchema, errorCallback).close();

export {
  initDB,
  openDB,
};
