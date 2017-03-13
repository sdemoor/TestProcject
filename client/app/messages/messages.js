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
  });


});
