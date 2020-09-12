const express = require('express');
const http = require('http-status-codes');
const logger = require('log4js');
const fs = require('fs');
const path = require('path');
const config = require('../../config.json');

const log = logger.getLogger('image');

const router = express.Router();

const baseRoute = '/api/image';
const imagePath = path.resolve(config.imagePath);

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
 *          500:
 *              description: Internal server error
 */
router.get(`${baseRoute}/:id`, (req, res) => {
    try {
        const imageFullPath = imagePath + path.sep + req.params.id;
        if (fs.existsSync(imageFullPath)) {
            log.debug('Request to download image with id %s OK', req.params.id);
            res.status(http.OK).sendFile(imageFullPath);
        } else {
            log.debug('Request to download image with id %s Failed', req.params.id);
            res.sendStatus(http.NOT_FOUND);
        }
    } catch (err) {
        log.error(err.message);
        res.status(http.INTERNAL_SERVER_ERROR).send(err);
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
 *              description: Missing file or wrong file size or type
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
            const { image } = req.files;
            const imageFullPath = imagePath + path.sep + image.name;
            const imageSizeKb = Math.ceil(image.size / 1024);
            if (imageSizeKb > config.fileSize) {
                log.error('Image size %s Kb greater then allowed %s Kb', imageSizeKb, config.fileSize);
                res.status(http.UNPROCESSABLE_ENTITY).send({
                    success: false,
                    message: `Image too big (maximum ${config.fileSize} Kb)`,
                });
                return;
            }
            if (!config.fileTypes.includes(image.mimetype)) {
                log.error('Image mime type %s not in the allowed %s', image.mimetype, config.fileTypes.join(', '));
                res.status(http.UNPROCESSABLE_ENTITY).send({
                    success: false,
                    message: `Image mime type not allowed (allowed ${config.fileTypes.join(', ')})`,
                });
                return;
            }
            log.info('Saving image %s of size %s Kb and mime %s to %s', image.name, imageSizeKb, image.mimetype, imageFullPath);
            image.mv(imageFullPath, (err) => {
                if (err) {
                    log.error(err.message);
                    res.status(http.INTERNAL_SERVER_ERROR).send({
                        success: false,
                        message: err.message,
                    });
                } else {
                    res.status(http.OK).send({
                        success: true,
                        id: image.name,
                    });
                }
            });
        }
    } catch (err) {
        log.error(err.message);
        res.status(http.INTERNAL_SERVER_ERROR).send(err);
    }
});

module.exports = router;
