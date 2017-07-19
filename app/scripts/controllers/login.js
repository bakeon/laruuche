/**
 * Created by POL on 29/06/2017.
 */
'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the laruucheApp
 */
(function () {
  angular.module('laruucheApp')
    .controller('LoginCtrl', function ($scope, $firebaseAuth, authFactory) {

        $scope.googleLogin = function () {
          authFactory.$signInWithPopup("google").then(function (result) {
            console.log("Signed in as:", result.user.uid);
          }).catch(function (error) {
            console.error("Authentication failed:", error);
          })
        };

        $scope.logout = function(){
          authFactory.$unauth();
        };
    })


})();
