const User = require("../models/user.model");

async function addUser({ name, email, password }) {
	const newUser = new User({ name, email, password });
	return await newUser.save();
}

async function getUserByEmail(email) {
	return await User.findOne({ email });
}

module.exports = {
	addUser,
	getUserByEmail,
};
