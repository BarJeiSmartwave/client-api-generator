'use strict';

const { getCurrDirBase, dirExists, generateCommonFile, generateCommonFileWithDir, generateRouteFile } = require('./files');


module.exports = {
  hbs: require('./hbs'),
  getCurrDirBase: getCurrDirBase,
  dirExists: dirExists,
  generateCommonFile: generateCommonFile,
  generateCommonFileWithDir: generateCommonFileWithDir,
  generateRouteFile: generateRouteFile,
  cliArgumentHandler: require('./cliArgumentHandler')
}
