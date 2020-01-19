const usersSchema = `CREATE TABLE IF NOT EXISTS Users (
  id integer NOT NULL PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password text NOT NULL
);`;

export default usersSchema;
