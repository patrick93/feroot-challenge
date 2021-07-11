const sanitizeHtml = require("sanitize-html");

function sanitize(request, response, next) {
	const { body } = request;

	for (let [key, value] of Object.entries(body)) {
		request.body[key] = sanitizeHtml(value, {
			allowedTags: [],
			allowedAttributes: {},
		});
	}

	next();
}

module.exports = { sanitize };
