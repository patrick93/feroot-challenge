module.exports = {
	coverageReporters: ['json', 'text'],
	verbose: true,
	collectCoverage: true,
	coverageDirectory: 'coverage/coverage-jest',
	collectCoverageFrom: ['src/**', '!src/clients/**', '!src/constants/**', '!src/infra/**', '!src/controllers/**'],
	roots: ['tests/Unit/'],
	testPathIgnorePatterns: ['/config/'],
	testEnvironment: 'node'
};
