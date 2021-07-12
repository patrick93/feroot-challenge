const htmlSanitizer = require("../../../src/middlewares/html-sanitizer.middleware");

describe("sanitize html", () => {
	test("should sanitize html when fields contains html tags", () => {
		let request = {
			body: {
				field1: "<b>some field</b>",
				field2: "<script>console.log()</script>",
			},
		};
		let response = {};
		let next = jest.fn();

		const expected = {
			body: {
				field1: "some field",
				field2: "",
			},
		};

		htmlSanitizer.sanitize(request, response, next);

		expect(request).toEqual(expected);
		expect(next).toHaveBeenCalledTimes(1);
	});

	test("should keep original values when fields does contains html tags", () => {
		let request = {
			body: {
				field1: "some field",
				field2: "some field 2",
			},
		};
		let response = {};
		let next = jest.fn();

		const expected = {
			body: {
				field1: "some field",
				field2: "some field 2",
			},
		};

		htmlSanitizer.sanitize(request, response, next);

		expect(request).toEqual(expected);
		expect(next).toHaveBeenCalledTimes(1);
	});
});
