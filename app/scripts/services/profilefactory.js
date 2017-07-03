'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.ProfileFactory
 * @description
 * # ProfileFactory
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('ProfileFactory', ["$firebaseObject",
    function ($firebaseObject) {
      return function(uid){
        var ref = firebase.database().ref("users");
        var profileRef = ref.child(uid);

        // return it as a synchronized object
        return $firebaseObject(profileRef);
      }

  }]);
