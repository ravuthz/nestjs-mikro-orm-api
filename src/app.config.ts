export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  debug: process.env.DEBUG || false,
  jwt: {
    secretKey: process.env.SECRET_KEY || 'Ch@n9eMe',
    expiresIn: process.env.EXPIRES_IN || '1d',
  },
  database: {
    type: process.env.DB_TYPE || 'sqlite',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    dbName: process.env.DB_NAME || 'data.db',
    debug: process.env.DEBUG || false,
  },
  test: {
    database: {
      type: process.env.TEST_DB_TYPE || 'sqlite',
      host: process.env.TEST_DB_HOST || 'localhost',
      port: parseInt(process.env.TEST_DB_PORT, 10) || 5432,
      user: process.env.TEST_DB_USER || 'postgres',
      password: process.env.TEST_DB_PASS || 'postgres',
      dbName: process.env.TEST_DB_NAME || 'data.test.db',
      debug: process.env.TEST_DEBUG || false,
    },
  },
});
