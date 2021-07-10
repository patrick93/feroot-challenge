
const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const fs = require('fs');
const path = require('path');
const config = require('./config');

const port = process.env.NODEJS_API_PORT || 9000;

const server = restify.createServer({ name: config.name });

const cors = corsMiddleware({
	preflightMaxAge: 5, // Optional
	origins: ['*'],
	allowHeaders: [
		'authorization'
	]
});

// mids
server.pre(cors.preflight);
server.use(cors.actual);
server.use(restify.plugins.gzipResponse());
server.use(restify.plugins.fullResponse());
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));

// loading controllers
fs.readdirSync(path.join(__dirname, './src/controllers')).forEach(function (file) {
	const controller = require(`./src/controllers/${file}`);

	controller.set(server);
	console.log(`${file} registered`);
});

server.on('after', function (request, res, route, error) {
	console.error(error);
});

server.listen(port, function () {
	console.log('%s listening at %s', server.name, server.url);
});

module.exports = server;
