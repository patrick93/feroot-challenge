const authMiddleware = require("../middlewares/auth.middleware");
const userService = require("../services/user.service");

function setRoutes(server) {
	server.get("/user", authMiddleware.verify, getUserInfo);
}

async function getUserInfo(request, response, next) {
	try {
		const user = await userService.getUserByEmail(request.user.email);
		response.send(200, user);
	} catch (error) {
		console.log(error);
		next(error);
	}
}

module.exports = { set: setRoutes };
