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
      db.User.findOrCreate({where: {username: req.body.user.user.username}})
        // findOrCreate returns multiple resutls in an array
        // use spread to assign the array to function arguments
        .spread(function(user, created) {
          db.Message.create({
            UserId: user.get('id'),
            text: req.body.message,
            roomname: req.body.roomname
          }).then(function(message) {
            res.sendStatus(201);
          });
        });
    }
  },
  activerUser: {},

  users: {
    signin: function(req, res, next) {
      db.User.findOne({
        where: {username: req.body.username}
      })
      .then(function(user) {
        if (user === null) {
          next(new Error('User does not exist'));
        } else {
          if (req.body.password === useruser.get('pd')){
            //module.exports.activerUser = user;

            res.json(req.body.username);
          } else {
            next(new Error('Wrong password'));
          }
        }
      }).fail(function(error) {
        next(error);
      });
    },
    signup: function(req, res, next) {
      var username = req.body.username;
      var password = req.body.password;
      db.User.findOne({
        where: {username: req.body.username}
      })
      .then(function(user) {
        if (user) {
          console.log('problem');
          //next(new Error('User already exist!'));
        } else {
          db.User.create({
            username: req.body.username,
            pd: req.body.password
          })
          .then(function(userd) {
            res.json(req.body.username);
          })
        }
      });
    }

    // get: function (req, res) {
    //   db.User.findAll()
    //     .then(function(users) {
    //       res.json(users);
    //     });
    // },
    // post: function (req, res) {
    //   db.User.findOrCreate({where: {username: req.body.username}})
    //     // findOrCreate returns multiple resutls in an array
    //     // use spread to assign the array to function arguments
    //     .spread(function(user, created) {
    //       res.sendStatus(created ? 201 : 200);
    //     });
    // }
  }
};