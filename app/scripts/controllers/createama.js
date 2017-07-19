'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:CreateamaCtrl
 * @description
 * # CreateamaCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('CreateAmaCtrl', function ($rootScope ,$scope , Auth, $location, Users, $firebaseObject, Chatrooms,$mdDialog,$mdSidenav) {
    $rootScope.auth = Auth;
    var userUid = '';
    /*Load ChatRooms*/
    $scope.chatrooms = Chatrooms;
    // any time auth state changes, add the user data to scope
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

        userUid = $scope.user.$id;
        $scope.user.$loaded().then(function () {
          if(!$scope.user.isMentor){
            $location.path('/');
          }
          else{
            /*Create the chatroom*/
            $scope.amaChatroom = {
              name: '',
              createdBy:'',
              createdAt:'',
              questions:'',
            };

            $scope.createAMA = function(){
              $scope.amaChatroom.createdBy = userUid;
              $scope.amaChatroom.createdAt = firebase.database.ServerValue.TIMESTAMP;
              $scope.chatrooms.amaRooms.$add($scope.amaChatroom).then(function(){
                $scope.amaChatroom = {
                  name: '',
                  createdBy:$scope.user.$id,
                  createdAt:'',
                  questions:'',
                };

                $location.path('/userProfile');

              });
            };
          }
        });
      }
    });

  });
