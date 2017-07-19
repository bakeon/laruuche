'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:BackOfficeCtrl
 * @description
 * # BackOfficeCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('BackOfficeCtrl', ["$rootScope", "$scope","Auth", "Users", "$location", function ($rootScope, $scope, Auth, Users, $location) {

    $rootScope.auth = Auth;
    var userRef = firebase.database().ref();
    // any time auth state changes, add the user data to scope
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      if(!$rootScope.firebaseUser){
        $location.path('/login');
      }
      else if($rootScope.firebaseUser){
        /*Retrieve User Data*/
        $scope.user = Users.getProfile(firebaseUser.uid);
        var userLevel = Users.getProfile(firebaseUser.uid);
        userLevel.$loaded().then(function (userLevel) {
          userLevel = $scope.user.accessLevel;
          if(userLevel < 20){
            $location.path('/');
          }
          else{
            console.log('You are login as admin');
          }
        });

      }
    });





  }]);
