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
    let usersRef = firebase.database().ref('users');
    let users = $firebaseArray(usersRef);
    let ref = firebase.database().ref("chatrooms");

    let chatrooms = $firebaseArray(ref);
    let privateRooms = $firebaseArray(ref.child('private'));
    let publicRooms = $firebaseArray(ref.child('public'));

    let isRoomAdded = "";


    let Chatrooms = {
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
        return publicRooms.$getRecord(uid).name;
      },
      getPrivateChatroom: function(mentorId, studentId){
        let uid = mentorId+studentId;
        let chatroom = ref.child('private').orderByChild('uid').equalTo(uid);
        return $firebaseObject(chatroom);
      },
      setIsRoomAdded: function(value){
        isRoomAdded = value;
      },
      getIsRoomAdded: function(){
        return isRoomAdded;
      },
      all: chatrooms,
      publicRooms: publicRooms,
      privateRooms: privateRooms
    };
    return Chatrooms;

  });
