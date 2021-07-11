const userRepository = require("../repositories/user.repository");
const errors = require("restify-errors");

async function getUserByEmail(email) {
	const user = await userRepository.getUserByEmail(email);

	if (!user) {
		throw new errors.NotFoundError("User not found");
	}

	return { name: user.name, email: user.email };
}

module.exports = {
	getUserByEmail,
};
