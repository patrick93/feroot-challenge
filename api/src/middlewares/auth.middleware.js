const jwt = require("jsonwebtoken");
const config = require("../../config");
const errors = require("restify-errors");

function verify(request, response, next) {
	const bearerHeader = request.headers["authorization"];

	if (!bearerHeader) {
		return next(new errors.ForbiddenError("No token provided"));
	}

	const [, token] = bearerHeader.split(" ");

	try {
		const { email } = jwt.verify(token, config.jwt.secretKey);
		request.user = { email };
		return next();
	} catch (error) {
		return next(new errors.UnauthorizedError("Unauthorized"));
	}
}

module.exports = { verify };
