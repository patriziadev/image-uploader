const yargs = require('yargs');

exports.getLogConfiguration = () => yargs.argv.log4js;

exports.getPortConfiguration = () => yargs.argv.port;
