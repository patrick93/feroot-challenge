const userRepository = require("../repositories/user.repository");
const bcrypt = require("bcrypt");
const errors = require("restify-errors");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const config = require("../config");

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
		password: await bcrypt.hashSync(password, config.passwordSaltRounds),
	});

	return { name: user.name, email: user.email };
}

async function signIn({ email, password }) {
	const user = await userRepository.getUserByEmail(email);

	if (!user) {
		throw new errors.BadRequestError("Email or Password is invalid");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		throw new errors.BadRequestError("Email or Password is invalid");
	}

	return jwt.sign({ email }, config.jwt.secretKey, {
		expiresIn: config.jwt.expires,
	});
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
	signIn,
};
