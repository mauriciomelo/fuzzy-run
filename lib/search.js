const Fuse = require('fuse.js');

const OPTIONS = {
  shouldSort: true,
  tokenize: true,
  includeScore: true,
  threshold: 0.6,
  location: 6,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    'name',
    'humanized',
  ],
};

const search = (commands, term) => {
  const fuse = new Fuse(commands, OPTIONS);
  return fuse.search(term);
};

module.exports = search;
