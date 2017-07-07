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
      $scope.userTrack = '';
      $scope.tracks = [
        "S - Scientifique",
        "L - Littéraire",
        "ES - Economique et sociale",
      ];

      $scope.userLevels = [
        {displayName:'Utilisateur', value:10},
        {displayName:'Modérateur', value:20},
        {displayName:'Administrateur', value:99}
      ];

      $scope.updateProfile = function(){
        $scope.user.$save().then(function(){
          //If works redirect
          console.log("Profile updated");
          $mdDialog.hide();
        }).catch(function(err){
          console.log(err);
        })
      };

  });
