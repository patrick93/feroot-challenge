const authMiddleware = require("../../../src/middlewares/auth.middleware");
const jwt = require("jsonwebtoken");
const errors = require("restify-errors");

jest.mock("jsonwebtoken");

describe("verify jwt", () => {
	test("should add user email in request when token is valid", () => {
		let request = {
			headers: {
				authorization: "Bearer valid-token",
			},
		};
		let response = {};
		let next = jest.fn();

		const userEmail = "user@email.com";

		const expected = {
			headers: {
				authorization: "Bearer valid-token",
			},
			user: {
				email: userEmail,
			},
		};

		jwt.verify.mockReturnValue({ email: userEmail });

		authMiddleware.verify(request, response, next);

		expect(request).toEqual(expected);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test("should throw a forbidden error when there is no token", () => {
		let request = {
			headers: {
				authorization: "",
			},
		};
		let response = {};
		let next = jest.fn();

		authMiddleware.verify(request, response, next);

		expect(next).toHaveBeenCalledWith(
			new errors.ForbiddenError("No token provided")
		);
	});

	test("should throw an unauthorized error when token is invalid", () => {
		let request = {
			headers: {
				authorization: "Bearer invalid-token",
			},
		};
		let response = {};
		let next = jest.fn();

		jwt.verify.mockImplementation(() => {
			throw new Error("Invalid token");
		});

		authMiddleware.verify(request, response, next);

		expect(next).toHaveBeenCalledWith(
			new errors.UnauthorizedError("Unauthorized")
		);
	});
});
