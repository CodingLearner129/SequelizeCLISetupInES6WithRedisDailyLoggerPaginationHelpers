import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
// import './models/index.js';
import db from './models/index.js';
import * as redis from './helpers/redis.js';
import logMessage from './helpers/logger.js';
import {getPagination, getPagingData} from './helpers/pagination.js';

// KEYS * // to get all keys

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get('*', async function (req, res) {
  try {
    const { page, size } = req.body;
    const { limit, offset } = getPagination(page, size);
    // const users = await db.User.findAll({
    //   include: {
    //     model: db.Company,
    //     as: "Company",
    //     required: false,
    //   }
    // })
    const users = await db.User.findAndCountAll({
      include: {
        model: db.Company,
        as: "Company",
        required: false,
      },
      limit, 
      offset
    });
    const Users = getPagingData(users, page, limit);
    // const companies = await db.Company.findAll({
    //   include: {
    //     model: db.User,
    //     as: "Users",
    //     required: false,
    //   }
    // });
    const companies = await db.Company.findAndCountAll({
      include: {
        model: db.User,
        as: "Users",
        required: false,
      }
      ,
      limit, 
      offset
    });
    const Companies = getPagingData(companies, page, limit);
    res.send({
      Users,
      Companies
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/set', async function (req, res) {
  try {
    const { key, value } = req.body;
    const result = await redis.set(key, value);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/set-with-exp', async function (req, res) {
  try {
    const { key, value,ttlSeconds } = req.body;
    const result = await redis.setWithExp(key, value, ttlSeconds);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/set-with-exp-with-no-over-ride', async function (req, res) {
  try {
    const { key, value, ttlSeconds } = req.body;
    const result = await redis.setWithExpWithNoOverRide(key, value, ttlSeconds);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/set-with-no-over-ride', async function (req, res) {
  try {
    const { key, value } = req.body;
    const result = await redis.setWithNoOverRide(key, value);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/get', async function (req, res) {
  try {
    const { key } = req.body;
    const result = await redis.get(key);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/del', async function (req, res) {
  try {
    const { key } = req.body;
    const result = await redis.del(key);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/left-push-in-list', async function (req, res) {
  try {
    const { key, value } = req.body;
    const result = await redis.leftPushInList(key, value);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/right-push-in-list', async function (req, res) {
  try {
    const { key, value } = req.body;
    const result = await redis.rightPushInList(key, value);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/get-all-data-of-list', async function (req, res) {
  try {
    const { key } = req.body;
    const result = await redis.getAllDataOfList(key);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/left-pop-in-list', async function (req, res) {
  try {
    const { key } = req.body;
    const result = await redis.leftPopInList(key);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/right-pop-in-list', async function (req, res) {
  try {
    const { key } = req.body;
    const result = await redis.rightPopInList(key);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/set-values-in-set', async function (req, res) {
  try {
    const { key, value } = req.body;
    const result = await redis.setValuesInSet(key, value);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/get-set-members-from-set', async function (req, res) {
  try {
    const { key } = req.body;
    const result = await redis.getSetMembersFromSet(key);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/remove-set', async function (req, res) {
  try {
    const { key } = req.body;
    const result = await redis.removeSet(key);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/member-exist-in-set', async function (req, res) {
  try {
    const { key, value } = req.body;
    const result = await redis.memberExistInSet(key, value);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/set-values-in-hash-set', async function (req, res) {
  try {
    const { key, fieldValue } = req.body;
    const result = await redis.setValuesInHashSet(key, fieldValue);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/get-all-hash-set', async function (req, res) {
  try {
    const { key } = req.body;
    const result = await redis.getAllHashSet(key);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/get-hash-set-by-key-and-field', async function (req, res) {
  try {
    const { key, field } = req.body;
    const result = await redis.getHashSetByKeyAndField(key, field);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/member-exist-in-hash-set', async function (req, res) {
  try {
    const { key, field } = req.body;
    const result = await redis.memberExistInHashSet(key, field);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

app.post('/remove-value-from-hash-set', async function (req, res) {
  try {
    const { key, field } = req.body;
    const result = await redis.removeValueFromHashSet(key, field);
    res.send({
      status: result
    });
  } catch (error) {
    logMessage(error);
    res.send({
      status: ''
    });
  }
});

// await sequelize.sync(); // force: true - This creates the table, dropping it first if it already existed
// // await sequelize.sync({alter: true}); //alter: true - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.
// console.log("All models were synchronized successfully.");

export default app;