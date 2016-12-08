'use strict';


const args            = require('args');
const path            = require('path');
const configJSONPath  = path.join(__dirname, '../templates', 'config.json.template.hbs');

const { generateCommonFile } = require('./files');

function generateConfig(name, sub, options) {

  console.log(configJSONPath);
  // create the config.json
  console.log('Generating config.json...');
  generateCommonFile('config.json', {}, configJSONPath);
  console.log('Finished generating config.json');
}

const cliArgumentHandler = {
  parseArguments: () => {
    args
    .option('config', 'config.json file', 'config.json')
    .option('name', 'name of the project')
    .command('generateConfig', 'generate config.json template', generateConfig)

    const flags = args.parse(process.argv);

    return {
      config: flags.c || flags.config,
      name: flags.n || flags.name
    }
  }
};


module.exports = cliArgumentHandler;
