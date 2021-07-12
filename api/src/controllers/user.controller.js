const authMiddleware = require("../middlewares/auth.middleware");
const userService = require("../services/user.service");

const { parseError } = require("../utils/error.utils");

function setRoutes(server) {
	server.get("/user", authMiddleware.verify, getUserInfo);
}

async function getUserInfo(request, response, next) {
	try {
		const user = await userService.getUserByEmail(request.user.email);
		return response.send(200, user);
	} catch (error) {
		return next(parseError(error));
	}
}

module.exports = { set: setRoutes };
