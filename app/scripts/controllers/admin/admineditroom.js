'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:AdmineditroomCtrl
 * @description
 * # AdmineditroomCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('AdminEditRoomCtrl', function ($rootScope, $scope, Users, roomToEdit, $mdDialog, Chatrooms) {
    $scope.room = Chatrooms.getRoom(roomToEdit.$id);

    $scope.updateProfile = function(){
      $scope.room.$save().then(function(){
        //If works redirect
        console.log("Room updated");
        $mdDialog.hide();
      }).catch(function(err){
        console.log(err);
      })
    };

  });
