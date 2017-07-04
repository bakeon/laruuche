'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.Users
 * @description
 * # Users
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('Users', function ($firebaseArray, $firebaseObject) {

    var usersRef = firebase.database().ref('users');
    var users = $firebaseArray(usersRef);

    var Users = {
      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },
      all: users

    };

    return Users;

  });
