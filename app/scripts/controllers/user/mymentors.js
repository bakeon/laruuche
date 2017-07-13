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
        $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
        $scope.user.$loaded().then(function () {
          userUid = $scope.user.$id;
          $scope.mentors = Users.getMyMentors(userUid);
          /*Get all mentors*/
          $scope.mentors.$loaded().then(function () {
            $scope.getDisplayName = function(uid){
              return Users.getDisplayName(uid);
            }
          });

          /*Join the private room*/
          $scope.joinPrivateRoom = function(mentorId, studentId){
            let myRoom = firebase.database().ref('chatrooms').child('private').orderByChild('uid').equalTo(mentorId+studentId);
            myRoom.on('value', function(snap){
              for(let value in snap.val()){
                $location.path('/panel/privateroom/'+value);
                break;
              }
            });
          }
        });
      }

    });
  });
