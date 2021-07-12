module.exports = {
	name: "feroot-challenge-api",
	mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017",
	passwordSaltRounds: 10,
	jwt: {
		secretKey: "feroot-challenge-key",
		expires: "1 day",
	},
};
