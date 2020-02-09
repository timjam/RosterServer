import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../index';

const User = {
  create: (username, password) => {
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

    return db.query(querytext, values);
  },

  // TODO: Maybe both should return object?
  // { rows, rowCount } || { error }
  getAll: async () => {
    const querytext = 'SELECT * FROM users';

    try {
      const { rows, rowCount } = await db.query(querytext);
      return { rows, rowCount };
    } catch (error) {
      return error;
    }
  },

  getOne: async (id) => {
    const querytext = 'SELECT * FROM users WHERE id = $1';
    const values = [id];

    try {
      const { rows } = await db.query(querytext, values);
      if (!rows[0]) {
        return new Error('User not found');
      }
      return rows;
    } catch (error) {
      return error;
    }
  },

  getOneByName: (username) => {
    const querytext = 'SELECT password FROM users WHERE username=$1';
    const values = [username];

    return db.query(querytext, values);
  },

  updatePassword: async (id, oldpassword, newpassword) => {
    const querytext = `UPDATE users 
      SET password=$1, modified_date=$2 
      WHERE id=$3 returning *`;

    try {
      //  Change these to use something other than just id
      const user = this.getOne(id);

      const values = [
        newpassword,
        moment(new Date()),
        user.id,
      ];

      const response = await db.query(querytext, values);
      return response;
    } catch (error) {
      return error;
    }
  },

  delete: async (id) => {
    const queryText = 'DELETE FROM users WHERE id=$1 returning *';

    try {
      const { rows } = await db.query(queryText, [id]);
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
