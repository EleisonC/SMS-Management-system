require('dotenv').config()
const {DB_USERNAME,DB_DIALECT,DB_NAME,TEST_DB_NAME,DB_PASSWORD,DB_HOST} = process.env
module.exports = {
  development: {
    username:DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: 'localhost',
    dialect: DB_DIALECT
  },
  test: {
    username: DB_USERNAME,
    password: null,
    database: TEST_DB_NAME,
    host: "127.0.0.1",
    dialect: DB_DIALECT
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
};