const { expect } = require('chai');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('exec', () => {
  it('executes as a child process', () => {
    const childProcess = {
      spawn: sinon.stub(),
    };
    const command = 'build';
    childProcess.spawn.returns({ on: sinon.stub() });
    const exec = proxyquire('./exec', { child_process: childProcess });
    exec(command);
    expect(childProcess.spawn.calledWith('npm', ['run', command], { stdio: 'inherit' })).to.equal(true);
  });
});
