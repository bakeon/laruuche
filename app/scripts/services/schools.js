'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.Schools
 * @description
 * # Schools
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('Schools', function ($firebaseArray, $firebaseObject) {
    let usersRef = firebase.database().ref('users');
    let users = $firebaseArray(usersRef);
    let ref = firebase.database().ref("schools");

    let schools = $firebaseArray(ref);


    let Schools = {
      all: schools
    };
    return Schools;

  });
