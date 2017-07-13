/**
 * @ngdoc function
 * @name laruucheApp.controller:ChatroomCtrl
 * @description
 * # ChatroomCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('ChatRoomCtrl', ["$rootScope", "$scope", "$routeParams", "Users", "Auth", "Messages", "Chatrooms", "$firebaseObject",'$mdSidenav',
    function ($rootScope, $scope, $routeParams, Users, Auth, Messages, Chatrooms, $firebaseObject,$mdSidenav) {
      $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };
      // any time auth state changes, add the user data to scope
      $rootScope.auth = Auth;
      $scope.user = '';
      $scope.chatroomName = '';
      $scope.chatroom = '';
      $scope.getUserName = '';
      $scope.getRoomName = '';
      $scope.ChatroomsList='';
      let chatrooms = Chatrooms.all;
      let chatRef = firebase.database().ref('chatrooms');

      /*Get the room object*/
      $scope.ChatRoomObj = Chatrooms.getRoom($routeParams.id);
      console.log($scope.ChatRoomObj);

      chatrooms.$loaded().then(function () {
        $scope.chatroom = chatrooms.$getRecord($routeParams.id);
        $scope.messages = Messages.getPublicChatMessages($routeParams.id);
        $.each($scope.messages, function (index, value) {
          console.log(index);
        });
        $scope.getUserName = function (uid) {
          return Users.getDisplayName(uid);
        }
        $scope.getPhotoURL = function(uid){
          return Users.getPhotoURL(uid);
        }



      });

      $rootScope.auth.$onAuthStateChanged(function (firebaseUser) {
        $rootScope.firebaseUser = firebaseUser;
        $scope.getRoomName = function (uid) {
          return Chatrooms.getName(uid);
        };

        if (!$rootScope.firebaseUser) {
          $location.path('/login');
        }
        else {
          /*Retrieve User Data*/
          $scope.user = Users.getProfile(firebaseUser.uid);

          $scope.user.$loaded().then(function () {
            //Do all things when user is logged;
            $scope.ChatRoomObj.$loaded().then(function () {
              $scope.chatroomName = $scope.ChatRoomObj.name;

            });

          });

          /*Add user to the chatroom*/
          $scope.ChatroomsList = Users.getRooms(firebaseUser.uid);
        }
      });



      $scope.message = '';
      $scope.sendMessage = function () {
        if ($scope.message.length > 0) {
          $scope.messages.$add({
            uid: $scope.user.$id,
            body: $scope.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(function () {
            $scope.message = '';
          });
        };
      };

      let room = [];
      $scope.addRoomToUser = function () {
        let roomToAdd = $routeParams.id;
        let exist;
        let userRef = firebase.database().ref().child('users').child(firebaseUser.uid).child('roomList');
        userRef.once('value').then(function (snapshot) {
          room = snapshot.val();
          if (room == null) {
            room = new Array();
            room[0] = roomToAdd;
          }
          else {
            room.forEach(function (value) {
              if (value==roomToAdd){
                exist=true;
              }
              else{
                exist=false
              }
            });
            if(exist==false){
              room.push(roomToAdd);
            }
          }
          console.log(room);
          userRef.set(room);
        });
        /*let isUser = Users.getProfile(uid);
         isUser.$loaded().then(function(isUser) {
         if(isUser.email){
         //user exist
         }
         else{
         userRef.child('users').child('room').set(user);
         }
         });*/
      };

      $scope.enterChat = function (id) {
        $location.path('/panel/chatroom/' + id);
      };




    }]);
