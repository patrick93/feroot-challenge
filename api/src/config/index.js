module.exports = {
	name: "feroot-challenge-api",
	mongodbUrl: process.env.MONGODB_URL || "mongodb://localhost:27017",
	passwordSaltRounds: 10,
	jwt: {
		//In a real app, this info would be retrieved in a secret service, like a vault service
		secretKey: "feroot-challenge-key",
		expires: "1 day",
	},
};
