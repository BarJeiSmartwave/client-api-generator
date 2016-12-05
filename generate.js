'use strict';

var fs = require("fs");
var handlebars = require('handlebars');

const routeProxyPath = "./templates/route.proxy.template.hbs";
const routePath = "./templates/route.template.hbs";

// source: http://stackoverflow.com/questions/14887677/handlebars-helper-functions-extract-property-names
// context : object you wish to transform
// options.fn will contain the HTML block
handlebars.registerHelper('pairs', function(context, options) {
    var cells = [], html, k;
    for (k in context) {
        if (context.hasOwnProperty(k)) {
            html = options.fn({
                key: k,
                value: context[k]
            });
            cells.push(html);
        }
    }
    return cells.join('');
});

try {

  console.log(">> Reading config file...");
  const data = fs.readFileSync('./config.json');
  const config = JSON.parse(data);
  const proxyConfig = config.proxyConfig;
  const routes = config.routes;

  console.log("Proxy config: " + proxyConfig);
  console.log("Routes: " + routes);

  console.log("Generating route files...");

  if (routes instanceof Array && routes.length > 0) {

    routes.forEach((route) => {

      if (route.isProxy !== undefined && route.isProxy) {
        generateRouteFile(route, routeProxyPath);
      } else {
        // set the nonProxyPath so that we can prepend later
        route.nonProxyPath = proxyConfig.nonProxyPath;
        generateRouteFile(route, routePath);
      }

    });

    console.log("Finished generating route files...");

  } else {
    throw("No routes specified.")
  }



} catch(e) {
  console.error("ERROR");
  console.error(e);
}


function generateRouteFile(route, routeTemplatePath) {
  const source = readHBS(routeTemplatePath);
  const routeData = JSON.stringify(route);
  console.log(routeData);
  const output = renderToString(source, route);
  console.log(output);

  if (output !== undefined && output && output !== '' && route.implPath !== undefined && route.implPath) {

    //create directory if not existing
    if (!fs.existsSync(route.implPath)) {
      fs.mkdirSync(route.implPath);
    }

    //write to file
    try {
      fs.writeFileSync(route.implPath + "/" + route.filename, output);
    } catch(e) {
      console.error(err);
    }

     console.log("File: " + route.implPath + "/" + route.filename + " generated successfully!");

  } else {
    throw('Handlebar produced nothing or implPath and filename is not specified...')
  }
}

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


console.log("Code generation finished...");
