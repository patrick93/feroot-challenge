const mongoose = require("mongoose");
const config = require("../../config");

console.log(config.mongodbUrl);

mongoose.connect(`${config.mongodbUrl}/db`, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const userSchema = new mongoose.Schema({
	name: String,
});

const User = mongoose.model("User", userSchema);

function setRoutes(server) {
	server.get("/ping", isAlive);
}

async function isAlive(request, response, next) {
	try {
		const user = await User.find({}).exec();
		console.log(user);
		return response.send(200, user);
	} catch (err) {
		console.log(err);
		response.send(500);
		return next();
	}
}

module.exports = { set: setRoutes };
