const express = require('express');
const http = require('http-status-codes');
const logger = require('log4js');
const fs = require('fs');
const path = require('path');
const utils = require('../utils/command-parser');

const log = logger.getLogger('image');

const router = express.Router();

const baseRoute = '/api/image';
const imagePath = path.resolve(utils.getImagePath());

/**
 * @swagger
 *
 * /image/{id}:
 *  get:
 *      summary: "Get an image by id"
 *      produces:
 *          - application/octet-stream
 *      parameters:
 *          - in: path
 *            name: id
 *            description: Image id
 *            type: string
 *            required: true
 *      responses:
 *          200:
 *              description: OK
 *              schema:
 *                  type: file
 *          404:
 *              description: NOT FOUND
 */
router.get(`${baseRoute}/:id`, (req, res) => {
    log.debug('Request to download image with id %s', req.params.id);
    const imageFullPath = imagePath + path.sep + req.params.id;
    if (fs.existsSync(imageFullPath)) {
        res.status(http.OK).sendFile(imageFullPath);
    } else {
        res.sendStatus(http.NOT_FOUND);
    }
});

/**
 * @swagger
 *
 * /image:
 *  post:
 *      summary: "Upload an image"
 *      consumes:
 *          - "multipart/form-data"
 *      parameters:
 *          - in: formData
 *            name: image
 *            type: file
 *            description: file to upload
 *      produces:
 *          - "application/json"
 *      responses:
 *          200:
 *              description: OK
 *              schema:
 *                  type: object
 *                  properties:
 *                      success:
 *                          type: boolean
 *                          description: true if successfull
 *                      id:
 *                          type: integer
 *                          description: id of the uploaded image
 *          422:
 *              description: Missing file parameter
 *              schema:
 *                  type: object
 *                  properties:
 *                      success:
 *                          type: boolean
 *                          default: false
 *                          description: false to indicate error
 *                      message:
 *                          type: string
 *                          description: error message
 *          500:
 *              description: Internal server error
 *
 */
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
            // TODO: manage multiple file upload
            const { image } = req.files;
            const imageFullPath = imagePath + path.sep + image.name;
            log.info('Saving image %s of size %s to %s', image.name, image.size, imageFullPath);
            image.mv(imageFullPath, (err) => {
                res.status(http.INTERNAL_SERVER_ERROR).send(err);
            });
            res.status(http.OK).send({
                success: true,
                id: image.name,
            });
        }
    } catch (err) {
        res.status(http.INTERNAL_SERVER_ERROR).send(err);
    }
});

module.exports = router;
