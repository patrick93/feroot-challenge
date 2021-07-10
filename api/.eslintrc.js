module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
		"jest/globals": true,
	},
	extends: ["eslint:recommended", "prettier", "plugin:jest/recommended"],
	plugins: ["prettier"],
	parserOptions: {
		ecmaVersion: 12,
	},
	rules: {
		"prettier/prettier": "error",
	},
};
