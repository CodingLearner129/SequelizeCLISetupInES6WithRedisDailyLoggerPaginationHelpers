import fs from 'fs';
import Sequelize from 'sequelize';
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
dotenvExpand.expand(dotenv.config('./../.env'));
const { DataTypes } = Sequelize;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.APP_ENV || 'development';
// import configJson from '../config/config.json' assert { type: 'json' };
import configJson from '../config/config.js';
const config = configJson[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}
const modelFiles = fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      !file.includes('.test.js')
    );
  });
for (const file of modelFiles) {
  const model = (await import(`file://${path.join(__dirname, file)}`)).default(sequelize, DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
