/* eslint-disable prefer-arrow-callback */
import { openDB } from '../configs/connectionManager';

// TODO: Move response handling to routes!
const findByUsername = (username, res) => {
  openDB().get('SELECT id FROM Users WHERE username = ?', username, function (error, row) {
    if (!error) {
      res.status(200).end(JSON.stringify(row));
    } else {
      res.status(400).end(JSON.stringify(error));
    }
  });
};

// Different callback signature. Can't use same callback with sqlite3.get and .run
const registerUser = (username, password, res) => {
  openDB().run('INSERT INTO Users (username, password) VALUES (?, ?)', [username, password], function (error) {
    if (!error) {
      console.log('insert succesful');
      res.status(200).end(JSON.stringify(this.lastID));
    } else {
      console.log(error);
      res.status(400).end(JSON.stringify(error));
    }
  });
};

export {
  registerUser,
  findByUsername,
};
