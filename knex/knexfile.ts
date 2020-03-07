export = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3.db',
    },
    useNullAsDefault: true,
    migrations: {
      directory: __dirname + '/migrations/dev',
    },
    seeds: {
      directory: __dirname + '/seeds/dev',
    },
  },

  staging: {
    client: 'pg',
    connection: process.env.DATABASE_URL,

    pool: {
      min: 2,
      max: 10,
    },

    migrations: {
      directory: __dirname + '/migrations/dev',
    },

    seeds: {
      directory: __dirname + '/seeds/dev',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,

    pool: {
      min: 2,
      max: 10,
    },

    migrations: {
      directory: __dirname + '/migrations/prod',
    },

  },
};
