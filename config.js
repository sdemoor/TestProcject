'use strict';

// Hierarchical node.js configuration with command-line arguments, environment
// variables, and files.
var nconf = module.exports = require('nconf');
var path = require('path');
var acred = require('./mvp-data-final-b16143ee84f7.json');

nconf
  // 1. Command-line arguments
  .argv()
  // 2. Environment variables
  .env([
    'CLOUD_BUCKET',
    'DATA_BACKEND',
    'GCLOUD_PROJECT',
    'PORT'
  ])
  // 3. Config file
  .file({ file: path.join(__dirname, 'config.json') })
  // 4. Defaults
  .defaults({
    // Typically you will create a bucket with the same name as your project ID.
    CLOUD_BUCKET: 'mvp-ds-s',

    // dataBackend can be 'datastore', 'cloudsql', or 'mongodb'. Be sure to
    // configure the appropriate settings for each storage engine below.
    // If you are unsure, use datastore as it requires no additional
    // configuration.
    DATA_BACKEND: 'datastore',

    // This is the id of your project in the Google Cloud Developers Console.
    GCLOUD_PROJECT: 'mvp-data-final',
    GOOGLE_APPLICATION_CREDENTIALS: acred,

    // MongoDB connection string


    // Port the HTTP server
    PORT: 3000
  });

// Check for required settings
checkConfig('GCLOUD_PROJECT');
checkConfig('CLOUD_BUCKET');



function checkConfig (setting) {
  if (!nconf.get(setting)) {
    throw new Error('You must set  as an environment variable or in config.json!');
  }
}