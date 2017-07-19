'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:AdminEditUserCtrl
 * @description
 * # AdminEditUserCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('AdminEditUserCtrl', function ($rootScope, $scope, Users, userToEdit, $mdDialog) {
      $scope.user = Users.getProfile(userToEdit.$id);
      var getTags = Users.getTags(userToEdit.$id);
      getTags.$loaded().then(function () {
        if(getTags){
          $scope.tags = getTags.$value.split(',');
        }
        else{
          $scope.tags = [];
        }
      });

      $scope.userTrack = '';
      $scope.tracks = [
        "S",
        "L",
        "ES",
        "STI2D",
        "ST2S",
        "STL",
        "STMG"
      ];

      $scope.userLevels = [
        {displayName:'Utilisateur', value:10},
        {displayName:'Modérateur', value:20},
        {displayName:'Administrateur', value:99}
      ];

      $scope.updateProfile = function(){
        $scope.user.tags = $scope.tags.join();
        $scope.user.$save().then(function(){
          //If works redirect
          console.log("Profile updated");
          $mdDialog.hide();
        }).catch(function(err){
          console.log(err);
        })
      };

  });
