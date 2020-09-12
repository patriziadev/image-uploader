const express = require('express');
const http = require('http-status-codes');
const config = require('../../config.json');

const router = express.Router();

/**
 * @swagger
 *
 * /config:
 *  get:
 *      summary: "Retrive configuration of allowed image types and size for upload"
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
 *                      fileSize:
 *                          type: integer
 *                          description: maximum allowed file size in Kb
 *                      fileTypes:
 *                          type: array
 *                          description: list of mime types allowed
 *                          items:
 *                              type: string
 *
 */
router.get('/api/config', (req, res) => {
    res.status(http.OK).send({
        success: true,
        fileSize: config.fileSize,
        fileTypes: config.fileTypes,
    });
});

module.exports = router;
