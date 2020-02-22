import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default {

  query(text: string, params: any[]) {
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
