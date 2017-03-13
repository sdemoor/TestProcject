angular.module('simon.services', [])

.factory('Messages', function ($http) {


  var getAll = function (message) {
    return $http({
      method: 'GET',
      url: '/api/messages',
      //data: message
    })
    .then(function (resp) {
      console.log('resp', resp.data);
      return resp.data; //an array of message objects
    });
  };


  var addOne = function (message) {
    return $http({
      method: 'POST',
      url: '/api/messages',
      //data: message

    })
    .then(function (resp) {
      return resp
      console.log(resp)
   });
  };


  return {
    getAll: getAll,
    addOne: addOne
  };

})


.factory('Auth', function ($http, $location, $window) {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/api/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.simon');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.simon');
    $location.path('/signin');
  };


  return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };
});
