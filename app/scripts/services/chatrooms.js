'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.Chatrooms
 * @description
 * # Chatrooms
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('Chatrooms', function ($firebaseArray, $firebaseObject) {
    var usersRef = firebase.database().ref('users');
    var users = $firebaseArray(usersRef);

    var ref = firebase.database().ref("chatrooms");

    var chatrooms = $firebaseArray(ref);

    var Chatrooms = {
      getCreatorName: function(uid){
        return users.$getRecord(uid).displayName;
      },
      all: chatrooms
    };
    return Chatrooms;

  });
