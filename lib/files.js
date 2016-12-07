'use strict';
const fs            = require('fs');
const path          = require('path');
const handlebars  = require('handlebars');

function readHBS(path) {

  try {
    const data = fs.readFileSync(path);
    return data.toString();
  } catch(e) {
    console.error("ERROR");
    console.error(e);
  }
}

// this will be called after the file is read
function renderToString(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}

function generateCommonFile(filePath, configObj, templatePath) {
  const source = readHBS(templatePath);
  const output = renderToString(source, configObj);
  if (output !== undefined && output && output !== '') {
    //write to file
    try {
      console.log('Creating ' + filePath + ' file...');
      fs.writeFileSync(filePath, output);
      console.log("File: " + filePath + " generated successfully!");
    } catch(e) {
      console.log("Error encountered while creating " + filePath)
      console.error(e);
    }
  } else {
    throw('Handlebars produced nothing...');
  }
};

function getCurrDirBase() {
  return path.basename(process.cwd());
}

function dirExists(path) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (err) {
    return false;
  }
}

module.exports = {
  getCurrDirBase: getCurrDirBase,
  dirExists: dirExists,
  generateCommonFile: generateCommonFile,
  generateCommonFileWithDir: (dirPath, filePath, configObj, templatePath) => {
    //create directory if not existing
    if (!dirExists(dirPath)) {
      console.log("Creating directory " + dirPath + " ...");
      fs.mkdirSync(dirPath);
    }

    generateCommonFile(path.join(dirPath, filePath), configObj, templatePath);
  },
  generateRouteFile: (route, routeTemplatePath) => {
    const source = readHBS(routeTemplatePath);
    const output = renderToString(source, route);

    if (output !== undefined && output && output !== '' && route.implPath !== undefined && route.implPath) {

      //create directory if not existing
      if (!dirExists(route.implPath)) {
        console.log("Creating directory " + route.implPath + " ...");
        fs.mkdirSync(route.implPath);
      }

      //write to file
      try {
        fs.writeFileSync(path.join(route.implPath, route.filename), output);
      } catch(e) {
        console.error(e);
      }

      console.log("File: " + path.join(route.implPath, route.filename) + " generated successfully!");

    } else {
      throw('Handlebar produced nothing or implPath and filename is not specified...')
    }
  }

};
