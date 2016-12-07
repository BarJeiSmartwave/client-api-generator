#!/usr/bin/env node

'use strict';

const fs                                  = require("fs");
const handlebars                          = require('handlebars');
const path                                = require('path');
const chalk                               = require('chalk');
const clear                               = require('clear');
const CLI                                 = require('clui');
const figlet                              = require('figlet');
const inquirer                            = require('inquirer');
const Spinner                             = CLI.Spinner;
const touch                               = require('touch');
const { projectQuestions }                = require('./prompt');
const {
        hbs,
        getCurrDirBase,
        dirExists,
        generateCommonFile,
        generateCommonFileWithDir,
        generateRouteFile
      }                                   = require('./lib');

// template paths
const routeProxyPath                      = path.join(__dirname, 'templates', 'route.proxy.template.hbs');
const routePath                           = path.join(__dirname, 'templates', 'route.template.hbs');
const packageJSONPath                     = path.join(__dirname, 'templates', 'package.json.template.hbs');
const envFilePath                         = path.join(__dirname, 'templates', 'env.template.hbs');
const gitignorePath                       = path.join(__dirname, 'templates', 'gitignore.template.hbs');
const readmePath                          = path.join(__dirname, 'templates', 'README.template.hbs');
const travisPath                          = path.join(__dirname, 'templates', 'travis.yml.template.hbs');
const testPath                            = path.join(__dirname, 'templates', 'test.template.hbs');
const serverPath                          = path.join(__dirname, 'templates', 'server.template.hbs');
const routesPath                          = path.join(__dirname, 'templates', 'routes.template.hbs');
const swaggerSpecPath                     = path.join(__dirname, 'templates', 'swaggerSpec.template.hbs');
const ProcFilePath                        = path.join(__dirname, 'templates', 'Procfile.template.hbs');


// clear the terminal
clear();
console.log(
  chalk.blue(
    figlet.textSync('CODE-GEN', { horizontalLayout: 'full' })
  )
);

// get the terminal args
const argv = require('minimist')(process.argv.slice(2));

console.log("Current directory: " + getCurrDirBase());

const configFilePath = argv._[0] || 'config.json';

// setup libs
hbs.setup(handlebars);

try {

  console.log(">> Reading config file...");
  // read the config file
  const data = fs.readFileSync(configFilePath);
  const config = JSON.parse(data);
  const projectConfig = config.projectConfig
  const environment = config.environment;
  const routes = config.routes;

  // ask for project configuration
  // will get default values from config.json you provided
  inquirer.prompt(projectQuestions.get(projectConfig, argv)).then((answers) => {

    // Get the values from answers obj
    // and generate package.json file
    const packageJSONObj = {
      name: answers.name,
      description: answers.description,
      version: answers.version,
      author: answers.author,
      entryFile: answers.entryFile
    };

    const projectDirName = answers.name;

    generateCommonFile('package.json', packageJSONObj, packageJSONPath);

    // create .env
    generateCommonFile('.env', { "environment": environment }, envFilePath);

    // create .gitignore
    generateCommonFile('.gitignore', {}, gitignorePath);

    // create travis yml
    generateCommonFile('.travis.yml', { name: projectConfig.name }, travisPath);

    // create Procfile for heroku
    generateCommonFile('Procfile', { entryFile: 'server.js' }, ProcFilePath);

    // create README
    const readmeObj = {
      name: answers.name.toUpperCase(),
      description: answers.description
    }
    generateCommonFile('README.md', readmeObj, readmePath);

    // create the server file
    generateCommonFile('server.js', {}, serverPath);

    // create sample test file
    generateCommonFileWithDir('test', 'test.js', {}, testPath);

    // Generate route files
    console.log("Generating route files...");
    if (routes instanceof Array && routes.length > 0) {

      routes.forEach((route) => {

        if (route.isProxy !== undefined && route.isProxy) {
          generateRouteFile(route, routeProxyPath);
        } else {
          // set the nonProxyPath so that we can prepend later
          route.environment = environment;
          generateRouteFile(route, routePath);
        }

      });

      console.log("Finished generating route files...");

      // Generate routes.js
      const routesArr = routes.map((r) => {
        return {
          name: r.name,
          path: './' + path.join(r.implPath, r.filename)
        };
      });
      generateCommonFile('routes.js', { routes: routesArr }, routesPath);

      // Generate swaggerSpec file
      generateCommonFile('swaggerSpec.js', { name: projectConfig.name, version: projectConfig.version, routes: routesArr }, swaggerSpecPath);

      console.log("Project generation done.")

    } else {
      throw("No routes specified.")
    }

  });


} catch(e) {
  console.error("ERROR");
  console.error(e);
}
