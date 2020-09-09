const express = require('express');
const http = require('http-status-codes');

const router = express.Router();

const baseRoute = '/api/image';

router.get(`${baseRoute}/:id`, (req, res) => {
    console.log('Request to load image with id', req.params.id);
    res.end();
});

router.post(baseRoute, (req, res) => {
    try {
        if (!req.files) {
            res.status(http.UNPROCESSABLE_ENTITY).send({
                success: false,
                message: 'Missing files to upload',
            });
        } else {
            // TODO: check for filesize limit and try to look for streaming
            const { image } = req.files;
            console.log('Read image of size', image.size);
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
