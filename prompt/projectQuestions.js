'use strict';

module.exports = {
  get: (projectConfig, argv) => {
    return [
      {
        type: 'input',
        name: 'name',
        message: 'Enter a name for the project:',
        default: argv._[0] || projectConfig.name,
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
    ];
  }
}
