'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:ChatroomCtrl
 * @description
 * # ChatroomCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('ChatRoomCtrl', [ "$rootScope", "$scope", "$routeParams", "Users", "Auth", "Messages", "Chatrooms", "$firebaseObject",
    function ($rootScope, $scope, $routeParams, Users, Auth, Messages, Chatrooms, $firebaseObject) {
    // any time auth state changes, add the user data to scope
    $rootScope.auth = Auth;
    $scope.chatroomName = '';
    $scope.chatroom = '';
    $scope.getUserName = '';
    var chatrooms = Chatrooms.all;
    var chatRef = firebase.database().ref('chatrooms');



      chatrooms.$loaded().then(function(){
      $scope.chatroom = chatrooms.$getRecord($routeParams.id);
      $scope.chatroomName = chatrooms.$getRecord($routeParams.id).name;
      $scope.messages = Messages.getChatMessages($routeParams.id);
        $.each($scope.messages,function(index, value){
          console.log(index);
        });


      $scope.getUserName = function(uid){
          return Users.getDisplayName(uid);
        }
    });

    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      if(!$rootScope.firebaseUser){
        $location.path('/login');
      }
      else{
        /*Retrieve User Data*/
        $scope.user = Users.getProfile(firebaseUser.uid);
        /*Add user to the chatroom*/

      }

      $scope.message = '';
      $scope.sendMessage = function(){
        console.log('ok');
        if($scope.message.length > 0 ){
          $scope.messages.$add({
            uid:$scope.user.$id,
            body:$scope.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(function(){
            $scope.message = '';
          });
        };
      }



    });


  }]);
