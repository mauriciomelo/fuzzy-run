const winston = require('winston');
const chalk = require('chalk');

const moduleName = 'fuzzy-run';
const colors = {
  error: 'red',
  info: 'cyan',
};

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      formatter: (options) => {
        const level = options.level;
        const message = options.message ? options.message : '';
        const prefix = `${moduleName} ${level}`;
        return `${chalk[colors[level]](prefix)}: ${message}`;
      },
    }),
  ],
});

module.exports = logger;
