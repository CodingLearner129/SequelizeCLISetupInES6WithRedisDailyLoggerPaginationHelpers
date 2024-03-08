// export default {
//     "development": {
//       "username": "root",
//       "password": null,
//       "database": "development_new_setup",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     },
//     "test": {
//       "username": "root",
//       "password": null,
//       "database": "test_new_setup",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     },
//     "production": {
//       "username": "root",
//       "password": null,
//       "database": "database_production",
//       "host": "127.0.0.1",
//       "dialect": "mysql"
//     }
// }

import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
dotenvExpand.expand(dotenv.config('./../.env'));
const CONFIG = {}; 

CONFIG.app = process.env.APP_ENV
CONFIG.port = process.env.APP_PORT;

export default {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    jwt_encryption: process.env.JWT_SECRET,
    dialect: process.env.DB_CONNECTION,
    email_verification_url: process.env.EMAIL_VERIFICATION_URL,
    forgot_password_url: process.env.FORGOT_PASSWORD_URL,
    smtp_from_mail: process.env.SMTP_FROM_MAIL,
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT,
    smtp_user: process.env.SMTP_USER,
    smtp_pass: process.env.SMTP_PASS, 
    image_url: process.env.ImageURL,
    signup_url: process.env.signUp_url,
    aws_bucket_name: process.env.AWS_S3_BUCKET_NAME,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      handleDisconnects: true,
      max: 100,
      min: 1,
      idle: 10000,
      acquire: 20000,
    },
    timezone: "+05:30",
    quoteEnumNames: true
  },
  test: {
    // username: "root",
    // password: null,
    // database: "database_test",
    // host: "127.0.0.1",
    // dialect: "mysql",
    "username": "root",
      "password": null,
      "database": "test_new_setup",
      "host": "127.0.0.1",
      "dialect": "mysql",
    timezone: "+05:30",
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION,
    email_verification_url: process.env.EMAIL_VERIFICATION_URL,
    forgot_password_url: process.env.FORGOT_PASSWORD_URL,
    smtp_from_mail: process.env.SMTP_FROM_MAIL,
    smtp_host: process.env.SMTP_HOST,
    smtp_port: process.env.SMTP_PORT, 
    smtp_user: process.env.SMTP_USER, 
    smtp_pass: process.env.SMTP_PASS, 
    image_url: process.env.ImageURL,
    signup_url: process.env.signUp_url,
    aws_bucket_name: process.env.AWS_S3_BUCKET_NAME,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    pool: {
      handleDisconnects: true,
      max: 100,
      min: 1,
      idle: 10000,
      acquire: 20000,
    },
    timezone: "+05:30",
  },
  CONFIG,
};