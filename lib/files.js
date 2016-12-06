'use strict';
var fs = require('fs');
var path = require('path');

module.exports = {
  getCurrDirBase: () => {
    return path.basename(process.cwd());
  },
  dirExists: (path) => {
    try {
      return fs.statSync(path).isDirectory();
    } catch (err) {
      return false;
    }
  }
};
