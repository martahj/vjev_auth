module.exports = {
  migrations: {
    directory: './database/migrations',
  },
  seeds: {
    directory: './seeds',
  },
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'vjev_auth_dev',
      user: 'martajohnson',
    },
    // seeds: {
    //   directory: './seeds'
    // }
  },
  test: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'vjev_auth_test',
      user: 'martajohnson',
    },
    debug: false, // set true for verbose database operations
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    // migrations: {
    //   directory: './database/migrations'
    // }
  },
};
