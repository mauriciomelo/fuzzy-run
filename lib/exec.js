const childProcess = require('child_process');

const exec = (command) => {
  const cmd = childProcess.spawn('npm', ['run', command], { stdio: 'inherit' });

  cmd.on('exit', (code) => {
    process.exit(code);
  });
};

module.exports = exec;
