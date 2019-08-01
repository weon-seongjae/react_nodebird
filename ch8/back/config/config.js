const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react_nodebird',
    host: '3.130.41.181',
    dialect: 'mysql',
  },
  test: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react_nodebird',
    host: '3.130.41.181',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: process.env.DB_PASSWORD,
    database: 'react_nodebird',
    host: '3.130.41.181',
    dialect: 'mysql',
  },
};
