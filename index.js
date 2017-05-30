#! /usr/bin/env node
/* eslint import/no-dynamic-require: 0 */

const log = require('winston');
const inquirer = require('inquirer');
const search = require('./lib/search');
const exec = require('./lib/exec');

const packageJSON = require(`${process.cwd()}/package.json`);
const commands = Object.keys(packageJSON.scripts).map(command => ({ command, humanized: command.split(':').join(' ') }));
const searchTerm = process.argv.slice(2).join(' ');

log.remove(log.transports.Console);
log.add(log.transports.Console, { colorize: true });

const prompt = () => {
  inquirer.prompt({
    message: 'Choose a command to run:',
    type: 'list',
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
  } else {
    log.error(`There are no results that match "${searchTerm}"`);
    process.exit(1);
  }
};

if (!searchTerm) {
  prompt();
} else {
  fuseSearch();
}
