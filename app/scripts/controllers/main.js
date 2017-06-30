'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the laruucheApp
 */

angular.module('laruucheApp')

  .controller('MainCtrl', function ($scope, $rootScope, $firebaseObject, AuthFactory) {
    var auth = AuthFactory;

    $rootScope.auth = AuthFactory;

    // any time auth state changes, add the user data to scope
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      console.log(firebaseUser);
    });

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
