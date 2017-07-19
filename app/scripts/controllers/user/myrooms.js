'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:MyStudentsCtrl
 * @description
 * # MyStudentsCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('MyRoomsCtrl', function ($rootScope, $scope, Auth, $location, Users, $firebaseObject, Chatrooms,$mdSidenav) {
    $rootScope.auth = Auth;
    var userUid = '';
    $scope.Chatrooms = Chatrooms;
    // any time auth state changes, add the user data to scope
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    $scope.logout = function(){
      Auth.$signOut().then(function(){
        $rootScope.isLogged=false;
        $scope.user = '';
        $rootScope.firebaseUser = '';
        $location.path('/');
      });
    };
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;

      if(!$rootScope.firebaseUser){
        $location.path('/');
      }
      else{
        /*Retrieve User Data*/
        $scope.user = Users.getProfile(firebaseUser.uid);
        $scope.user.$loaded().then(function () {
          //Do things when user is logged;
          userUid = $scope.user.$id;
          $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
          $scope.ChatroomsList.$loaded().then(function () {

          });
          $scope.ama = Chatrooms.getMyAMA(userUid);
          $scope.getRoomName = function(uid){
            return Chatrooms.getName(uid);
          };

          /*Enter to the chatroom*/
          $scope.enterChat = function(uid){
            $location.path('/chatroom/'+uid);
          }

        });

      }

    });
  });
