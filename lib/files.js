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
  generateRouteFile: (isProxy, routesDirName, routesImplDirName, route, routeTemplatePath, routeImplTemplatePath) => {
    const source = readHBS(routeTemplatePath);
    const output = renderToString(source, route);

    const routeFilename = route.name + ".js";
    const routeImplFilename = route.name + "Impl.js";

    if (output !== undefined && output && output !== '') {

      // generate route file
      try {
        fs.writeFileSync(path.join(routesDirName, routeFilename), output);
        console.log("File: " + path.join(routesDirName, routeFilename) + " generated successfully!");
      } catch(e) {
        console.error(e);
      }

      if (!isProxy) {

        if (!fs.existsSync(path.join(routesImplDirName, routeImplFilename))) {
          console.log(routeImplTemplatePath);
          console.log(routeTemplatePath);
          const sourceImpl = readHBS(routeImplTemplatePath);
          const outputImpl = renderToString(sourceImpl, route);

          // generate route implementation
          try {
            fs.writeFileSync(path.join(routesImplDirName, routeImplFilename), outputImpl);
            console.log("File: " + path.join(routesImplDirName, routeImplFilename) + " generated successfully!");
          } catch(e) {
            console.error(e);
          }
        } else {
          console.log("File: " + path.join(routesImplDirName, routeImplFilename) + " already exists. Skipping...");
        }

      }



    } else {
      throw('Handlebar produced nothing...')
    }
  }

};
