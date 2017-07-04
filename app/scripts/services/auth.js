'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.Auth
 * @description
 * # Auth
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('Auth', function ($firebaseAuth) {
      var auth = $firebaseAuth();
      return auth;
  });
