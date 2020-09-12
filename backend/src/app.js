const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const logger = require('log4js');
const swagger = require('swagger-ui-express');

const routeImage = require('./routes/image');
const routeConfig = require('./routes/config');
const swaggerJson = require('../swagger.json');
const config = require('../config.json');

const app = express();

const logConfiguration = config.log4js;

if (logConfiguration) {
    logger.configure(logConfiguration);
}

const log = logger.getLogger('app');
const port = config.port || 3000;

app.use('*', cors({
    origin: config.cors,
    optionsSuccessStatus: 200,
}));

app.listen(port, () => {
    log.debug('Application is listening on port %s', port);
});

app.use(fileUpload({
    createParentPath: true,
}));
app.use(routeImage);
app.use(routeConfig);

app.use('/api/swagger-ui.html', swagger.serve, swagger.setup(swaggerJson));
