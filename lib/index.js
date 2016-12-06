'use strict';

const { getCurrDirBase, dirExists } = require('./files');

module.exports = {
  hbs: require('./hbs'),
  getCurrDirBase: getCurrDirBase,
  dirExists: dirExists
}
