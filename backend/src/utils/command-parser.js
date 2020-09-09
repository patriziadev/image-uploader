const yargs = require('yargs');

exports.getLogConfiguration = function () {
    return yargs.argv.log4js;
};

exports.getPortConfiguration = function () {
    return yargs.argv.port;
};
