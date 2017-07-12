'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:MyMentorsCtrl
 * @description
 * # MyMentorsCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('MyMentorsCtrl', function ($rootScope, $scope, Auth, $location, Users, $firebaseObject, Chatrooms) {
    $rootScope.auth = Auth;
    var userUid = '';
    $scope.Chatrooms = Chatrooms;
    // any time auth state changes, add the user data to scope
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      $scope.getRoomName = function(uid){
        return Chatrooms.getName(uid);
      };
      if(!$rootScope.firebaseUser){
        $location.path('/login');
      }
      else{
        /*Retrieve User Data*/
        $scope.user = Users.getProfile(firebaseUser.uid);
        userUid = $scope.user.$id;
        $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
        $scope.mentors = Users.getMyMentors(userUid);
      }

      /*Get all students*/
      $scope.mentors.$loaded().then(function () {
      });

      $scope.getDisplayName = function(uid){
        return Users.getDisplayName(uid);
      }


      /*Join the private room*/
      $scope.joinPrivateRoom = function(mentorId, studentId){
        let myRoom = firebase.database().ref('chatrooms').orderByChild('uid').equalTo(mentorId+studentId);
        myRoom.on('value', function(snap){
          for(let value in snap.val()){
            $location.path('/panel/chatroom/'+value);
            break;
          }
        });
        console.log(myRoom);
      }

    });
  });
