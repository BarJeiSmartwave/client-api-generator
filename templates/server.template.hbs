'use strict';

const PORT            = process.env.PORT || 8080;
const APP_API_URL     = process.env.APP_API_URL || 'localhost';
const NON_PROXY_PATH  = process.env.NON_PROXY_PATH || '/mobile';
// proxy request
const httpProxy       = require('http-proxy');
const restify         = require('restify');
const server          = restify.createServer();
const routes          = require('./routes');
const swaggerSpec     = require('./swaggerSpec');

var proxy = new httpProxy.createProxyServer({
  target: APP_API_URL,
  changeOrigin: true
});


server.APP_API_URL = APP_API_URL;

proxy.on('error', (e) => {
  console.log('PROXY ERROR ' + e);
  console.log(JSON.stringify(e));
});

console.log(APP_API_URL);

const customRegex = /^\/mobile.*$/;

// source https://gist.github.com/jeffwhelpley/5417758
var wrapper = function(middleware) {
    return function(req, res, next) {
        // if url is a custom request, invoke middleware
        if(req.url.startsWith(NON_PROXY_PATH)) {
          console.log("NOT");
          // some middleware is an array (ex. bodyParser)
          if(middleware instanceof Array) {
              middleware[0](req, res, function() {
                  middleware[1](req, res, next);
              });
          }
          else {
              middleware(req, res, next);
          }
        }
        else { // else if proxy, just move to the next middleware
          console.log("FOR PROXY");
          next();
        }
    };
}


server.pre(restify.pre.userAgentConnection());
server.pre(restify.pre.sanitizePath());

// ======== restify middleware ======= //
server.use(wrapper(restify.acceptParser(server.acceptable)));
server.use(wrapper(restify.authorizationParser()));
server.use(wrapper(restify.queryParser()));
server.use(wrapper(restify.bodyParser({ mapParams: false })));
server.use(wrapper(restify.gzipResponse()));


// ======== Swagger endpoint ========= //
server.get('/api-docs.json', function(req, res, next) {

  console.log("SWAGGER SPEC: " + swaggerSpec);

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, api_key, Authorization');
  res.send(swaggerSpec);

  return next();
});

// initialize routes
routes.init(server, proxy);

server.listen(PORT, () => {
  console.log('%s listening at %s', server.name, server.url);
});

server.on('uncaughtException', function (request, response, route, error) {
  console.log("ERROR");
    console.log(error);
    response.send(error);
});
