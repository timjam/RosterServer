import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */

  query(text, params) {
    return new Promise((resolve, reject) => {
      try {
        const result = pool.query(text, params);
        return resolve(result);
      } catch (error) {
        return reject(error);
      }
    });
  },
};
