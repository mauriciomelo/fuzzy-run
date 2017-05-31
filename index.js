#! /usr/bin/env node
/* eslint import/no-dynamic-require: 0 */

const fs = require('fs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const log = require('./lib/logger');
const search = require('./lib/search');
const exec = require('./lib/exec');

const packageJSONPath = `${process.cwd()}/package.json`;
if (!fs.existsSync(packageJSONPath)) {
  log.error('package.json not found');
  process.exit(1);
}

const packageJSON = require(packageJSONPath);
const commands = Object.keys(packageJSON.scripts).map(command => ({ command, humanized: command.split(':').join(' ') }));
const searchTerm = process.argv.slice(2).join(' ');

const prompt = () => {
  inquirer.prompt({
    message: 'Choose a command to run:',
    type: 'rawlist',
    name: 'command',
    pageSize: 100,
    choices: commands.map(c => c.command),
  })
  .then((answer) => {
    exec(answer.command);
  });
};

const fuseSearch = () => {
  const result = search(commands, searchTerm);

  if (result.length > 0) {
    const command = result[0].item.command;
    exec(command);
    log.info(`running ${chalk.green.bold(command)}`);
  } else {
    log.error('Command not found');
    process.exit(1);
  }
};

if (!searchTerm) {
  prompt();
} else {
  fuseSearch();
}
