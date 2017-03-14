angular.module('simon', [
  'simon.services',
  'simon.messages',
  'simon.auth',
  'ngRoute'
  //"ng-files-model"
])
.config(function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when('/messages', {
      templateUrl: 'app/messages/messages.html',
      controller: 'uploader'
     //authenticate: true
    })
    // .when('/shorten', {
    //   templateUrl: 'app/shorten/shorten.html',
    //   controller: 'ShortenController',
    //   authenticate: true
    // })
    .otherwise({
      redirectTo: '/messages'
    })
  })
.directive('fileInput',['$parse', function($parse){
  return {
    restrict:'A',
    link:function(scope, elm, attrs){
      elm.bind('change', function(){
        $parse(attrs.fileInput)
        .assign(scope, elm[0].files)
        scope.$apply()
      })
    }
  }
}])
// controller('uploader', ['$scope', '$http', '$window',
//   function($scope, $http, $window) {

//     console.log($window.localStorage.getItem('com.simon-mvp'));
//     $scope.filesChanged = function(elm){
//       $scope.files = elm.files
//       $scope.$apply();
//     }
//     $scope.upload = function() {
//       var fd = new FormData()
//       angular.forEach($scope.files, function(file){
//         fd.append('file', file);
//       })
//        var user = $window.localStorage.getItem('com.simon-mvp');
//        fd.append('user', user);
//       $http.post('/load/file', fd,
//       {
//         transformRequest: angular.identity,
//         headers:{'Content-Type':undefined}
//       })
//       .success(function(d) {
//         console.log(d);
//       })
//     }
//   }
//   ])





    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
  //$httpProvider.interceptors.push('AttachTokens');

.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.simon');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
