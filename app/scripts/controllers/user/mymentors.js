'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:MyMentorsCtrl
 * @description
 * # MyMentorsCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('MyMentorsCtrl', function ($rootScope, $scope, Auth, $location, Users, $firebaseObject, Chatrooms,$mdSidenav) {
    $rootScope.auth = Auth;
    var userUid = '';
    $scope.Chatrooms = Chatrooms;
    // any time auth state changes, add the user data to scope
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      $scope.getRoomName = function(uid){
        return Chatrooms.getName(uid);
      };
      if(!$rootScope.firebaseUser){
        $location.path('/');
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
                $location.path('/userProfile/privateroom/'+value);
                break;
              }
            });
          }
        });
      }

    });
    $scope.logout = function(){
      Auth.$signOut().then(function(){
        $rootScope.isLogged=false;
        $scope.user = '';
        $rootScope.firebaseUser = '';
        $location.path('/');
      });
    };
  });
