import path from 'path';

const comparators = {

  equals: (file, type, reference) => {
    if(type === 'extension') {
      return path.parse(file).ext === reference;
    } else if(type === 'name') {
      return path.parse(file).name === reference;
    }
  },
  doesNotEquals: (file, type, reference) => {
    if(type === 'extension') {
      return path.parse(file).ext !== reference;
    } else if(type === 'name') {
      return path.parse(file).name !== reference;
    }
  },
  contains: (file, type, reference) => {
    if(type === 'extension') {
      return (path.parse(file).ext.indexOf(reference) >= 0)
    } else if(type === 'name') {
      return (path.parse(file).name.indexOf(reference) >= 0)
    }
  },
  doesNotContain: (file, type, reference) => {
    if(type === 'extension') {
      return (path.parse(file).ext.indexOf(reference) === -1)
    } else if(type === 'name') {
      return (path.parse(file).name.indexOf(reference) === -1)
    }
  }
};

module.exports = comparators;