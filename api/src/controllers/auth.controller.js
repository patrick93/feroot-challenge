const authService = require("../services/auth.service");
const htmlSanitizerMiddleware = require("../middlewares/html-sanitizer.middleware");

const { parseError } = require("../utils/error.utils");

function setRoutes(server) {
	server.post("/auth/signup", htmlSanitizerMiddleware.sanitize, signUp);
	server.post("/auth/signin", htmlSanitizerMiddleware.sanitize, signIn);
}

async function signUp(request, response, next) {
	try {
		const data = await authService.signup(request.body);
		return response.send(200, data);
	} catch (err) {
		return next(parseError(err));
	}
}

async function signIn(request, response, next) {
	try {
		const token = await authService.signIn(request.body);
		return response.send(200, { token });
	} catch (err) {
		return next(parseError(err));
	}
}

module.exports = { set: setRoutes };
