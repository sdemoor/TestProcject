// Get modules

var parser = require('body-parser');
var methodOverride = require('method-override');
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' }).any();

//var router = require('./routes.js');
//var router = require('./routes.js');
var express = require('express');
var app = express();
module.exports.app = app;




//configuration

var db = require('./db'); //verify if I need this!

var port = process.env.PORT || 3000;
app.set('port', port);


var morgan = require('morgan');

//app.use('/classes', router);

var controller = require('./controllers');
var controllerfile = require('./upthefile/upthefiler');

//var router = require('express').Router(); bypass routes to simplify and houve redirect to controllers inside this file

//Connect controller methods to their corresponding routes
  app.use(morgan('dev'));
  app.use(parser.urlencoded({extended: true}));
  //app.use(parser.json());
  //app.use('/', router);




app.use(express.static(__dirname + '/client'));


app.post('/api/file',  function hello(req, res, next) {
  // var storage = multer.({
  //       dest: 'uploads/'
  //   });
    // var uploa = multer({
    //     storage: storage
    // }).any();
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return res.end('Error');
        } else {
            console.log(req.body);
            req.files.forEach(function(item) {
                console.log('item',item);
                var hello = {file: item};
                controllerfile.sendUploadToGCS(hello, res, next);
                // move your file to destination
            });
            res.end('File uploaded');
        }
    });
});



app.get('/api/messages', controller.messages.get);

app.post('/api/messages', controller.messages.post);

app.post('/api/users/signin', controller.users.signin);

app.post('/api/users/signup', controller.users.post);





//module.exports = router;

// app.use(express.static(__dirname + '/../../client')); //Allows you to serve up any static files to client that are lcoated inside the client folder

//app.listen(app.get('port'));

 // console.log(__dirname);
//console.log('Listening on', app.get('port'));
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

//}

//app.use(parser.json());
//app.use(express.static(__dirname + '/../client'));


// If we are being run directly, run the server.
// if (!module.parent) {
//   app.listen(app.get('port'));
//   console.log(__dirname);
//   console.log('Listening on', app.get('port'));
// }



//connect to mysql database
//



