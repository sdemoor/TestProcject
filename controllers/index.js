var db = require('../db'); //serverside
var Q = require('q');
var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;


module.exports = {
  messages: {
    get: function (req, res) {
      db.Message.findAll({include: [db.User]})
        .then(function(messages) {
          res.json(messages);
        });
    },
    post: function (req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        // findOrCreate returns multiple resutls in an array
        // use spread to assign the array to function arguments
        .spread(function(user, created) {
          db.Message.create({
            userid: user.get('id'),
            text: req.body.message,
            roomname: req.body.roomname
          }).then(function(message) {
            res.sendStatus(201);
          });
        });
    }
  },

  users: {
    signin: function(req, res, next) {
      db.User.findOne({
        where: {username: req.body.username}
      })
      .then(function(user) {
        if (user === null) {
          next(new Error('User does not exist'));
        } else {
          bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
            if (err) {
                  next(new Error('Wrong password'));
            } else {
              var token = jwt.encode(user, 'secret');
              res.json({token: token});
            }
          });
        }
      })
      .fail(function(error) {
        next(error);
      });
    },
    signup: function(req, res, next) {
      var username = req.body.username;
      var password = req.body.password;
      console.log('username:', username);
      db.User.findOne({
        where: {username: req.body.username}
      }).then(function(user) {
        if (user) {
          next(new Error('User already exist!'));
        } else {
          bcrypt.hash(password, 'hello', null, function(err, hash) {
            if (err) {
              next(new Error('hashinh failed'));
            } else {
              db.User.create({
                username: req.body.username,
                password: hash
              })
              .then(function(user) {
                var token = jwt.encode(user, 'secret');
                res.json({token: token});
              })
            }
          });
        }
      })
      .fail(function (error) {
        next(error);
      });

    },

    get: function (req, res) {
      db.User.findAll()
        .then(function(users) {
          res.json(users);
        });
    },
    post: function (req, res) {
      db.User.findOrCreate({where: {username: req.body.username}})
        // findOrCreate returns multiple resutls in an array
        // use spread to assign the array to function arguments
        .spread(function(user, created) {
          res.sendStatus(created ? 201 : 200);
        });
    }
  }
};