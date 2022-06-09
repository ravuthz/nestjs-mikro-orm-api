export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  debug: process.env.DEBUG || false,
  database: {
    type: process.env.TYPE || 'postgresql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    dbName: process.env.DB_NAME || 'postgres',
    debug: process.env.DEBUG || false,
  },
});
