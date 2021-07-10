const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const errors = require("restify-errors");
const validator = require("validator");
const config = require("../../config");

async function signup({ name, email, password }) {
	_validateEmail(email);
	_validateName(name);
	_validatePassword(password);

	if (await userRepository.getUserByEmail(email)) {
		throw new errors.ConflictError(
			"Already exists an user registered with this email"
		);
	}

	const user = await userRepository.addUser({
		name,
		email,
		password: bcrypt.hashSync(password, config.passwordSaltRounds),
	});

	return { name: user.name, email: user.email };
}

function _validateEmail(email) {
	if (!validator.isEmail(email)) {
		throw new errors.BadRequestError("The field email is invalid");
	}
}

function _validateName(name) {
	if (validator.isEmpty(name)) {
		throw new errors.BadRequestError("The field name is invalid");
	}
}

function _validatePassword(password) {
	if (validator.isEmpty(password)) {
		throw new errors.BadRequestError("The field password is invalid");
	}
}

module.exports = {
	signup,
};
