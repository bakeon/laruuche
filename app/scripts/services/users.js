'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.Users
 * @description
 * # Users
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('Users', function ($firebaseArray, $firebaseObject, $firebaseUtils) {

    var usersRef = firebase.database().ref('users');
    var users = $firebaseArray(usersRef);
    var Users = {
      getTags: function(uid){
        return $firebaseObject(usersRef.child(uid).child('tags'));
      },
      getProfile: function(uid){
        return $firebaseObject(usersRef.child(uid));
      },
      getDisplayName: function(uid){
        return users.$getRecord(uid).displayName;
      },
      getPhotoURL: function(uid){
        return users.$getRecord(uid).photoURL;
      },
      getRooms :function (uid) {
        return $firebaseObject(usersRef.child(uid).child('roomList'));
      },
      all: users

    };

    return Users;

  });
