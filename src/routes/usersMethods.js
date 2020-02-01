/* eslint-disable prefer-arrow-callback */
import { openDB } from '../configs/connectionManager';

const signUpUser = (username, password) => new Promise((resolve, reject) => {
  openDB().run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], function (error) {
    if (error) {
      return reject(error);
    }
    return resolve(this.lastID);
  });
});

const signInUser = (username, password) => new Promise((resolve, reject) => {
  openDB().get('SELECT id FROM Users WHERE (username, password) = (?,?)', [username, password], function (error, row) {
    if (error) {
      return reject(error);
    }
    return resolve(row);
  });
});

const signOutUser = (username, password) => new Promise((resolve, reject) => {
  openDB().get('SELECT * FROM Users WHERE (username, password) = (?,?)', [username, password], function (error, row) {
    if (error) {
      return reject(error);
    }
    return resolve(row);
  });
});

export {
  signUpUser,
  signInUser,
  signOutUser,
};
