angular.module('simon.messages', [])

.controller('MessagesController', function ($scope, Messages) {
  //getAll();
  //use getallfunction to send all linkies to the
  // Your code here
  $scope.data = {};
    //
  Messages.getAll()
  .then(function(data) {
    console.log('data:', data);
    $scope.data.messages = data;
  })
   $scope.title = 'hi';
   $scope.text = 'hxi';
   $scope.myFile;





 $scope.sendfile = function(){
  console.log('hello');
  var file = $scope.myFile;
  var title = 'hi';
  var text = 'hxi';
    Messages.uploadFileToUrl(file, title, text).then(console.log('winner', $scope.myFile)).catch(console.log('error'));
  };


});
