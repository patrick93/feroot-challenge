module.exports = {
	name: "api",
	mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017",
	passwordSaltRounds: 10,
};
