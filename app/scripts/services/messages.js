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
      getChatMessages: function (chatroomId) {
        return $firebaseArray(chatMessagesRef.child(chatroomId).child('messages'))
      }
    };
    return Chatroom;

  });
