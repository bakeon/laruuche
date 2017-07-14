'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.Messages
 * @description
 * # Messages
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('Messages', function ($firebaseArray) {
    var chatMessagesRef = firebase.database().ref('chatrooms');

    var Chatroom = {
      forChatroom: function(chatroomId){
        return $firebaseArray(chatMessagesRef.child(chatroomId));
      },
      getPublicChatMessages: function (chatroomId) {
        return $firebaseArray(chatMessagesRef.child('public').child(chatroomId).child('messages'))
      },
      getPrivateChatMessages: function (chatroomId) {
        return $firebaseArray(chatMessagesRef.child('private').child(chatroomId).child('messages'))
      }
    };
    return Chatroom;

  });
