'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.authFactory
 * @description
 * # authFactory
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('authFactory', function ($firebaseAuth) {
    // Service logic
    return $firebaseAuth();

  });
