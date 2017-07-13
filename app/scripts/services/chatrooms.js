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
    var privateRooms = $firebaseArray(ref.child('private'));
    var publicRooms = $firebaseArray(ref.child('public'));

    var Chatrooms = {
      getRoom: function(uid){
        return $firebaseObject(ref.child('public').child(uid));
      },
      getPrivateRoom: function(uid){
        return $firebaseObject(ref.child('private').child(uid));
      },
      getCreatorName: function(uid){
        return users.$getRecord(uid).displayName;
      },
      getName:function (uid) {
        return chatrooms.$getRecord(uid).name;
      },
      getPrivateChatroom: function(mentorId, studentId){
        let uid = mentorId+studentId;
        let chatroom = ref.child('private').orderByChild('uid').equalTo(uid);
        return $firebaseObject(chatroom);
      },
      all: chatrooms,
      publicRooms: publicRooms,
      privateRooms: privateRooms
    };
    return Chatrooms;

  });
