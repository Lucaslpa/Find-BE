const config = require('./jest.config');
config.testRegex = 'test\\.ts$'; // Overriding testRegex option
console.log('RUNNING INTEGRATION TESTS');
module.exports = config;
