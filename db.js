import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('connect', () => {
  console.log('connected to db');
});

/** This file is only needed to create table to DB
 *  It doesn't really matter what way the tables are
 *  created. This was just for initial fooling around
 */

/** Create Tables */

const createTables = async () => {
  const query = `
  CREATE TABLE IF NOT EXISTS
   users(
     id UUID PRIMARY KEY,
     email VARCHAR(128) UNIQUE NOT NULL,
     username VARCHAR(128) UNIQUE NOT NULL,
     password VARCHAR(128) NOT NULL,
     created_date TIMESTAMP,
     modified_date TIMESTAMP
   )`;

  try {
    const result = await pool.query(query);
    pool.end();
    console.log(result);
  } catch (error) {
    pool.end();
    console.log(error);
  }
};

/** Drop Tables */

const dropTables = async () => {
  const query = 'DROP TABLE IF EXISTS users';
  try {
    const result = await pool.query(query);
    pool.end();
    console.log(result);
  } catch (error) {
    pool.end();
    console.log(error);
  }
};

export {
  createTables,
  dropTables,
};
