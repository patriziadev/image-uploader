const packageJson = require('./package.json');

module.exports = {
    info: {
        title: 'Image Uploader',
        version: packageJson.version,
    },
    basePath: '/api'
};