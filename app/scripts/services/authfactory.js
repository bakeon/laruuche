'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.authFactory
 * @description
 * # authFactory
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('AuthFactory', ["$firebaseAuth",

    function($firebaseAuth){
      return $firebaseAuth();
    }

  ]);
