angular.module('simon.messages', [])

.controller('uploader', function ($scope, FLIES, $window, $location, $http) {
  //getAll();
  //use getallfunction to send all linkies to the
  // Your code here
  $scope.user;

  $scope.filesChanged = function(elm){
      $scope.files = elm.files
      $scope.$apply();
    }
    $scope.upload = function() {
      var fd = new FormData()
      angular.forEach($scope.files, function(file){
        fd.append('file', file);
      })
       var user = $window.localStorage.getItem('com.simon-mvp');
       fd.append('user', user);
      $http.post('/load/file', fd,
      {
        transformRequest: angular.identity,
        headers:{'Content-Type':undefined}
      })
      .success(function(d) {
        console.log(d);
        // $scope.files = elm.files
        // $scope.$apply();

      })
    }
  $scope.data = {};
  $scope.user = $window.localStorage.getItem('com.simon-mvp');
  if (!$scope.user) {
    $location.path('/signin');
  }

  $scope.logout = function() {
    $window.localStorage.setItem('com.simon-mvp', undefined);
    $location.path('/signin');
  }

  $scope.getAllFiles = function() {
    var user = {user: $window.localStorage.getItem('com.simon-mvp')};
    FLIES.getAll(user)
    .then(function(data) {
      console.log('data:', data);
      $scope.data.files = data;
    });
  }
   $scope.getAllFiles();

    //







 // $scope.sendfile = function(){
 //  console.log('hello');
 //  var file = $scope.myFile;
 //  var title = 'hi';
 //  var text = 'hxi';
 //    Messages.uploadFileToUrl(file, title, text).then(console.log('winner', $scope.myFile)).catch(console.log('error'));
 //  };


});

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