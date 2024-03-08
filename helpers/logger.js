import winston from "winston";
import moment from "moment";
import 'winston-daily-rotate-file';

const dateFormat = () => {
    return moment().format("YYYY-MM-DD HH:mm:ss");
}

const fileRotateTransport = new winston.transports.DailyRotateFile({
    level: "error",
    filename: 'log-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    // filename: 'combined-%DATE%.log',
    // datePattern: 'YYYY-MM-DD',
    // zippedArchive: true,
    // maxSize: '20m',
    maxFiles: '1d',
});

const logger = winston.createLogger({
    level: 'error',
    // format: winston.format.printf((info) => {
    //     const regex = /\((.*):(\d+):(\d+)\)$/;
    //     const match = regex.exec(info.stack.split("\n")[1]);
    //     let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${match && [match[0]] ? [match[0]] : info.stack} | ${info}}`
    //     return message
    // }),
    // format: winston.format.printf((info) => {
    //     let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message}`;
    //     if (info.stack) {
    //         const match = /\((.*):(\d+):(\d+)\)$/.exec(info.stack.split("\n")[1]);
    //         if (match && match.length >= 4) {
    //             message += ` | ${match[1]}:${match[2]}:${match[3]}`;
    //         }
    //     }
    //     return message;
    // }),
    // format: winston.format.combine(
    //     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //     winston.format.errors({ stack: true }),
    //     winston.format.printf(({ timestamp, level, message, stack }) => {
    //         if (stack) {
    //             return `${timestamp} | ${level.toUpperCase()} | ${message} | ${stack}`;
    //         } else {
    //             return `${timestamp} | ${level.toUpperCase()} | ${message}`;
    //         }
    //     })
    // ),
    // format: winston.format.combine(
    //     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //     winston.format.errors({ stack: true }),
    //     winston.format.printf(({ timestamp, level, message, stack }) => {
    //         let logMessage = `${timestamp} | ${level.toUpperCase()} | ${message}`;
    //         if (stack) {
    //             logMessage += ` | ${stack}`;
    //         }
    //         return logMessage;
    //     })
    // ),
    // format: winston.format.combine(
    //     winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    //     winston.format.printf(({ timestamp, level, message }) => {
    //         return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    //     }),
    //     winston.format.splat(), // This is needed to log objects and exceptions properly
    //     winston.format.errors({ stack: true }),
    //     winston.format.printf(info => {
    //         if (info.stack) {
    //             return `${info.stack}`;
    //         }
    //         return '';
    //     })
    // ),
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf(({ timestamp, level, message, stack }) => {
            let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
            if (stack) {
                logMessage += `\n[${timestamp}] ${level.toUpperCase()}: ${stack}`;
            }
            return logMessage;
        })
    ),
    transports: [
        fileRotateTransport
    ],
});

const logMessage = (error, level = "error") => {
    logger.log(level, error.message, { stack: error.stack });
};
export default logMessage;