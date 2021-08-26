// Update with your config settings.

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/db.sqlite',
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: 'true',
  },
  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    ssl: true,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './src/database/migrations',
    },
    useNullAsDefault: 'true',
  },
};
