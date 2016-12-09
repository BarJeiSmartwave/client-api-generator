'use strict';

module.exports = {
  get: (projectConfig, consoleArguments, routesConfig) => {
    return [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the project:',
        default: consoleArguments.name || projectConfig.name,
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter a name for the project';
          }
        }
      },
      {
        type: 'input',
        name: 'version',
        message: 'Enter project version:',
        default: projectConfig.version || "1.0.0",
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter project version';
          }
        }
      },
      {
        type: 'input',
        name: 'description',
        default: projectConfig.description || "",
        message: 'Optionally enter a description of the project:'
      },
      {
        type: 'input',
        name: 'author',
        message: 'Enter project author:',
        default: projectConfig.author || "",
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter project author';
          }
        }
      },
      {
        type: 'input',
        name: 'entryFile',
        message: 'Enter entry file\'s name:',
        default: projectConfig.entryFile || "index.js",
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter entry file\'s name';
          }
        }
      },
      {
        type: 'input',
        name: 'routesDirName',
        message: 'Enter directory name for routes: ',
        default: routesConfig.dirName || "routes",
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter name for routes directory';
          }
        }
      },
      {
        type: 'input',
        name: 'routesImplDirName',
        message: 'Enter directory name for route implmentations: ',
        default: routesConfig.implDirName || "routes",
        validate: function( value ) {
          if (value.length) {
            return true;
          } else {
            return 'Please enter name for route implementations';
          }
        }
      }
    ];
  }
}
