// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('simon.auth', [])

.controller('AuthController', function ($scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = function () {
    console.log('user', $scope.user);
    Auth.signin($scope.user)
      .then(function (user) {
        console.log('userobj', user);
        $window.localStorage.setItem('com.simon-mvp', user);
        $location.path('/messages');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  $scope.signup = function () {
        console.log('user', $scope.user);

    Auth.signup($scope.user)
      .then(function (user) {
        console.log('return user', user);
        $window.localStorage.setItem('com.simon-mvp', user);
        $location.path('/messages');
      })
      .catch(function (error) {
        console.error(error);
      });
  };
});