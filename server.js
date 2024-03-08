import app from './app.js';
import http from 'http';
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand"
dotenvExpand.expand(dotenv.config('./.env'));

const env = process.env.APP_ENV || 'development';
import configJson from './config/config.js';
// import configJson from './config/config.json' assert { type: 'json' };
const config = configJson[env];

const port = process.env.PORT || 3001;
const server = http.createServer(app);
const listenServer = server.listen(port, () => {
    console.log(`Listening on http://${config.host}:${port}`);
});
