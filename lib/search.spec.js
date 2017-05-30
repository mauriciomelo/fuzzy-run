const { expect } = require('chai');
const search = require('./search');

describe('search', () => {
  it('find the exact match', () => {
    const commands = [
      { name: 'build' },
      { name: 'test' },
    ];
    const result = search(commands, 'build');
    expect(result[0].item.name).to.equal('build');
  });

  it('find with only part of the search term', () => {
    const commands = [
      { name: 'build' },
      { name: 'test' },
    ];
    const result = search(commands, 'bui');
    expect(result[0].item.name).to.equal('build');
  });

  it('find with misspelled search term', () => {
    const commands = [
      { name: 'build' },
      { name: 'test' },
    ];
    const result = search(commands, 'buiud');
    expect(result[0].item.name).to.equal('build');
  });

  it('also looks at the humanized key ', () => {
    const commands = [
      { name: 'test' },
      { name: 'generate', humanized: 'build' },
    ];
    const result = search(commands, 'build');
    expect(result[0].item.name).to.equal('generate');
  });
});
