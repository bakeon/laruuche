'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.Degrees
 * @description
 * # Degrees
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('Degrees', function ($firebaseArray, $firebaseObject) {
    var degreesRef = firebase.database().ref('degrees');
    var degrees = $firebaseArray(degreesRef);
    var allDegrees = $firebaseObject(degreesRef);

    var Degrees = {
      getDegree: function(uid){
        return $firebaseObject(degreesRef.child(uid));
      },
      degreesObject: allDegrees,
      all: degrees

    };

    return Degrees;

  });
