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
 * Common method to build and send REST API response
 * @param {Response} res
 * @param {number} httpStatus
 * @param {boolean} success
 * @param {string} message
 * @returns response
 */
function buildResponse(res, httpStatus, success, message) {
    if (httpStatus === http.OK) {
        return res.status(httpStatus).send({
            success,
            id: message,
        });
    }
    return res.status(httpStatus).send({
        success,
        message,
    });
}

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
        // If busboy is not defined, no file has been uploaded, quit immediatly
        if (!req.busboy) {
            log.error('Received request without files');
            buildResponse(res, http.UNPROCESSABLE_ENTITY, false, 'Missing files to upload');
            return;
        }

        req.pipe(req.busboy);

        // Manage streaming upload of the file
        req.busboy.on('file', (fieldname, stream, filename, transferEncoding, mimeType) => {
            const isMimeTypeCorrect = config.fileTypes.includes(mimeType);
            let isTooBig = false;

            // create base folder if doesn't exists
            if (!fs.existsSync(imagePath)) {
                fs.mkdirSync(imagePath, { recursive: true });
            }
            const imageFullPath = imagePath + path.sep + filename;

            // if mimeType is not correct consume the stream and return
            if (!isMimeTypeCorrect) {
                stream.resume();
                const allowedTypes = config.fileTypes.join(', ');
                const errorMessage = `Image mime type not allowed (allowed ${allowedTypes})`;
                log.error('Image mime type %s not one of the allowed %s', mimeType, allowedTypes);
                buildResponse(res, http.UNPROCESSABLE_ENTITY, false, errorMessage);
            } else {
                log.info('Saving image %s with mime %s to %s', filename, mimeType, imageFullPath);

                // if the uploaded file size exceed limit, consume the stream and exit
                stream.on('limit', () => {
                    log.error('Image size greater then allowed %s Kb', config.fileSize);
                    stream.resume();
                    isTooBig = true;
                    if (fs.existsSync(imageFullPath)) {
                        // Remove asynchronously to not make the process wait for the deletion
                        log.info('Removing incomplete file %s', imageFullPath);
                        fs.unlink(imageFullPath, () => {});
                    }
                });

                stream.on('end', () => {
                    if (!isTooBig) {
                        log.info('Image %s saved', filename);
                        buildResponse(res, http.OK, true, filename);
                    } else {
                        const errorMessage = `Image too big (maximum ${config.fileSize} Kb)`;
                        buildResponse(res, http.UNPROCESSABLE_ENTITY, false, errorMessage);
                    }
                });

                // save the uploaded stream
                stream.pipe(fs.createWriteStream(imageFullPath));
            }
        });
    } catch (err) {
        log.error(err.message);
        res.status(http.INTERNAL_SERVER_ERROR).send(err);
    }
});

module.exports = router;
