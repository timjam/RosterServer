import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../index';
import { QueryResult } from 'pg';

const User = {
  create: async (username: string, password: string) => {
    const querytext = `INSERT INTO
      users(id, username, password, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;

    const values = [
      uuidv4(),
      username,
      password,
      moment(new Date()),
      moment(new Date()),
    ];

    return await db.query(querytext, values) as QueryResult;
  },

  // TODO: Maybe both should return object?
  // { rows, rowCount } || { error }
  getAll: async () => {
    const querytext = 'SELECT * FROM users';

    try {
      const { rows, rowCount } = await db.query(querytext, []) as QueryResult;
      return { rows, rowCount };
    } catch (error) {
      return error;
    }
  },

  // TODO: Check if uuids can be typechecked and use as types instead of plain string
  getOne: async (id: string) => {
    const querytext = 'SELECT * FROM users WHERE id = $1';
    const values = [id];

    return await db.query(querytext, values) as QueryResult;
  },

  getOneByName: (username: string) => {
    const querytext = 'SELECT password FROM users WHERE username=$1';
    const values = [username];

    return db.query(querytext, values);
  },

  updatePassword: async (id: string, oldpassword: string, newpassword: string) => {
    const querytext = `UPDATE users
      SET password=$1, modified_date=$2
      WHERE id=$3 returning *`;

    try {
      //  Change these to use something other than just id
      const { rows } = await User.getOne(id);

      if (rows[0]) {
        const user = rows[0];

        const values = [
          newpassword,
          moment(new Date()),
          user.id,
        ];
        const response = await db.query(querytext, values);
        return response;
      } else {
        return new Error('User not found');
      }

    } catch (error) {
      return error;
    }
  },

  delete: async (id: string) => {
    const queryText = 'DELETE FROM users WHERE id=$1 returning *';

    try {
      const { rows } = await db.query(queryText, [id]) as QueryResult;
      if (!rows[0]) {
        return new Error('USer not found');
      }
      return 1;
    } catch (error) {
      return error;
    }
  },
};

export default User;
