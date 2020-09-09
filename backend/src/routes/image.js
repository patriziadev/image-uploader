const express = require('express');
const http = require('http-status-codes');
const logger = require('log4js');

const log = logger.getLogger('image');

const router = express.Router();

const baseRoute = '/api/image';

router.get(`${baseRoute}/:id`, (req, res) => {
    log.debug('Request to load image with id %s', req.params.id);
    res.end();
});

router.post(baseRoute, (req, res) => {
    try {
        if (!req.files) {
            log.error('Received request without files %s', req);
            res.status(http.UNPROCESSABLE_ENTITY).send({
                success: false,
                message: 'Missing files to upload',
            });
        } else {
            // TODO: check for filesize limit and try to look for streaming
            const { image } = req.files;
            log.info('Read image of size %s', image.size);
            res.status(http.OK).send({
                success: true,
                id: -1,
            });
        }
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).send(err);
    }
});

module.exports = router;
