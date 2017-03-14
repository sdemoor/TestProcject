'use strict';

var Storage = require('@google-cloud/storage');
var config = require('../config');
var db = require('../db');
var controller = require('../controllers');


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

    bucket.upload(req.file.path, function(err, file) {
      if (!err) {
        console.log('success username',  req.body.user);

        var filename = req.file.originalname;
        var fileId = file.id;
        db.User.findOne({
          where: {username:  req.body.user}
        }).then(function(user){
          console.log('usernow', user.dataValues.id);
          db.File.create({
              UserId: user.get('id'),//controller.activeUser.id,
              filename: filename,
              fileid: fileId
            }).then(function(file) {
              //res.sendStatus(201);
          })
            })


    // "zebra.jpg" is now in your bucket.
      } else {
        console.log('zebror');
      }
    });
  }
};

  //   var gcsname = req.file.originalname; //Date.now() +
  //   var file = bucket.file(gcsname);

  //   var stream = file.createWriteStream({
  //     metadata: {
  //       contentType: req.file.mimetype
  //     }
  //   });

  //   stream.on('error', function(err)  {
  //     console.log('stream error');

  //     req.file.cloudStorageError = err;
  //     next(err);
  //   });

  //   stream.on('finish', function()  {
  //           console.log('stream success');

  //     req.file.cloudStorageObject = gcsname;
  //     req.file.cloudStoragePublicUrl = module.exports.getPublicUrl(gcsname);
  //     //res.redirect(req.file.cloudStoragePublicUrl);
  //     console.log('public url', req.file.cloudStoragePublicUrl);
  //     next();
  //   });
  //   // console.log('buffer', )

  //   stream.end(req.file.buffer);//buffer
  // }
//};
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

