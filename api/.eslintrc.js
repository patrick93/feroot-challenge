module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
		"jest/globals": true,
	},
	extends: ["eslint:recommended", "prettier"],
	plugins: ["prettier", "jest"],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		"prettier/prettier": "error",
	},
};
