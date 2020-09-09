const express = require('express');
const fileUpload = require('express-fileupload');
const logger = require('log4js');

const commandParser = require('./utils/command-parser');
const image = require('./routes/image');

const app = express();

const logConfiguration = commandParser.getLogConfiguration();

if (logConfiguration) {
    logger.configure(logConfiguration);
}

const log = logger.getLogger('app');
const port = commandParser.getPortConfiguration() || 3000;

app.listen(port, () => {
    log.debug('Application is listening on port %s', port);
});

app.use(fileUpload());
app.use(image);
