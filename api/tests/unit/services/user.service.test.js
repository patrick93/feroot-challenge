const userService = require("../../../src/services/user.service");
const userRepository = require("../../../src/repositories/user.repository");
const errors = require("restify-errors");

jest.mock("../../../src/repositories/user.repository");

describe("get user by email", () => {
	test("should return user data when user exists", async () => {
		const userEmail = "user@email.com";

		const expected = {
			name: "User Name",
			email: userEmail,
		};

		userRepository.getUserByEmail.mockReturnValue({
			_id: "userId",
			name: "User Name",
			email: userEmail,
			password: "user-password",
		});

		const actual = await userService.getUserByEmail(userEmail);

		expect(actual).toEqual(expected);
	});

	test("should throw an error when user does not exists", async () => {
		const userEmail = "user@email.com";

		userRepository.getUserByEmail.mockReturnValue(null);

		await expect(userService.getUserByEmail(userEmail)).rejects.toThrow(
			new errors.NotFoundError("User not found")
		);
	});
});
