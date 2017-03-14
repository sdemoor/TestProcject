'use strict';

var Storage = require('@google-cloud/storage');
var config = require('../config');

var CLOUD_BUCKET = config.get('CLOUD_BUCKET');

var storage = Storage({
  projectId: config.get('GCLOUD_PROJECT'),
  keyFilename: './mvp-data-final-b16143ee84f7.json'
});
var bucket = storage.bucket(CLOUD_BUCKET);

// Returns the public, anonymously accessable URL to a given Cloud Storage
// object.
// The object's ACL has to be set to public read.
// [START public_url]
module.exports = {
  getPublicUrl:  function(filename) {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
  },
// [END public_url]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
// [START process]
  sendUploadToGCS: function(req, res, next) {
    if (!req.file) {
      console.log('problem', req.fieldname);
      return next();
    }

    var gcsname = Date.now() + req.file.originalname;
    var file = bucket.file(gcsname);

    var stream = file.createWriteStream({
      metadata: {
        contentType: req.file.mimetype
      }
    });

    stream.on('error', function(err)  {
      console.log('stream error');

      req.file.cloudStorageError = err;
      next(err);
    });

    stream.on('finish', function()  {
            console.log('stream success');

      req.file.cloudStorageObject = gcsname;
      req.file.cloudStoragePublicUrl = module.exports.getPublicUrl(gcsname);
      next();
    });

    stream.end(req.file.cloudStoragePublicUrl);//buffer
  }
};
// [END process]

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
// [START multer]
// var Multer = require('multer');
// var multer = Multer({
//   storage: Multer.MemoryStorage,
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb
//   }
// });
// [END multer]

// module.exports = {
//   getPublicUrl,
//   sendUploadToGCS,
//   multer
// };

