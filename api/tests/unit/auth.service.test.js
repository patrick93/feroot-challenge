const authService = require("../../src/services/auth.service");
const userRepository = require("../../src/repositories/user.repository");
const bcrypt = require("bcrypt");
const errors = require("restify-errors");

jest.mock("../../src/repositories/user.repository");
jest.mock("bcrypt");

describe("sign up", () => {
	test("should create user", async () => {
		const userInfo = {
			name: "User Name",
			email: "user@email.com",
			password: "user-password",
		};
		const expected = { name: "User Name", email: "user@email.com" };

		userRepository.addUser.mockReturnValue({
			_id: "userId",
			name: "User Name",
			email: "user@email.com",
			password: "user-password",
		});

		const actual = await authService.signup(userInfo);

		expect(actual).toEqual(expected);
	});

	test("should create user with hashed password", async () => {
		const userInfo = {
			name: "User Name",
			email: "user@email.com",
			password: "user-password",
		};

		bcrypt.hashSync.mockReturnValue("hashed-user-password");

		userRepository.addUser.mockReturnValue({
			_id: "userId",
			name: "User Name",
			email: "user@email.com",
			password: "user-password",
		});

		await authService.signup(userInfo);

		expect(userRepository.addUser).toHaveBeenCalledWith({
			name: "User Name",
			email: "user@email.com",
			password: "hashed-user-password",
		});
	});

	test("should throw an error when already exists a user with same email", async () => {
		const userInfo = {
			name: "User Name",
			email: "user@email.com",
			password: "user-password",
		};

		userRepository.getUserByEmail.mockReturnValue({
			name: "Other User Name",
			email: "user@email.com",
			password: "other-user-password",
		});

		await expect(authService.signup(userInfo)).rejects.toThrow(
			new errors.ConflictError(
				"Already exists an user registered with this email"
			)
		);
	});

	test("should throw an error when email is empty", async () => {
		const userInfo = {
			name: "User Name",
			email: "",
			password: "user-password",
		};

		await expect(authService.signup(userInfo)).rejects.toThrow(
			new errors.BadRequestError("The field email is invalid")
		);
	});

	test("should throw an error when email is invalid", async () => {
		const userInfo = {
			name: "User Name",
			email: "userName",
			password: "user-password",
		};

		await expect(authService.signup(userInfo)).rejects.toThrow(
			new errors.BadRequestError("The field email is invalid")
		);
	});

	test("should throw an error when name is empty", async () => {
		const userInfo = {
			name: "",
			email: "user@email.com",
			password: "user-password",
		};

		await expect(authService.signup(userInfo)).rejects.toThrow(
			new errors.BadRequestError("The field name is invalid")
		);
	});

	test("should throw an error when password is empty", async () => {
		const userInfo = {
			name: "User Name",
			email: "user@email.com",
			password: "",
		};

		await expect(authService.signup(userInfo)).rejects.toThrow(
			new errors.BadRequestError("The field password is invalid")
		);
	});
});
