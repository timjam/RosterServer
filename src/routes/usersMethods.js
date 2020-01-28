/* eslint-disable prefer-arrow-callback */
import { openDB } from '../configs/connectionManager';

const findByUsername = (username) => new Promise((resolve, reject) => {
  openDB().get('SELECT id FROM Users WHERE username = ?', username, function (error, row) {
    if (!error) {
      return resolve(row);
    }
    return reject(error);
  });
});

const registerUser = (username, password) => new Promise((resolve, reject) => {
  openDB().run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], function (error) {
    if (error) {
      return reject(error);
    }
    return resolve(this.lastID);
  });
});

export {
  registerUser,
  findByUsername,
};
