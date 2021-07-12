const errors = require("restify-errors");

function parseError(error) {
	if (!(error instanceof errors.HttpError)) {
		return new errors.InternalServerError(
			`Unknow Error - ${error.message}`,
			error
		);
	}

	return error;
}

module.exports = {
	parseError,
};
