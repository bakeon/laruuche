'use strict';

/**
 * @ngdoc service
 * @name laruucheApp.Messages
 * @description
 * # Messages
 * Factory in the laruucheApp.
 */
angular.module('laruucheApp')
  .factory('Messages', function ($firebaseArray, $firebaseObject, Users) {
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
      },
      getAmaChatQuestions: function (chatroomId) {
        return $firebaseArray(chatMessagesRef.child('ama').child(chatroomId).child('questions'))
      },
      getAmaQuestion: function(chatroomId, questionId){
        return $firebaseObject(chatMessagesRef.child('ama').child(chatroomId).child('questions').child(questionId));
      },
      addLikeOrDislikeQuestion: function (chatroomId, questionId, userId) {
        let ref = chatMessagesRef.child('ama').child(chatroomId).child('questions').child(questionId).child('likes').child(userId);
        ref.once('value').then(function(snap) {
          if(snap.val() == null){
            console.log('like');
            let data = {
              displayName:Users.getDisplayName(userId),
              timestamp:firebase.database.ServerValue.TIMESTAMP
            }
            ref.set(data);
          }
          else{
            console.log('dislike');
            ref.remove();
          }
        });
      },
      getMyLike: function (chatroomId, questionId, userId){
        let ref = chatMessagesRef.child('ama').child(chatroomId).child('questions').child(questionId).child('likes').child(userId);
        return ref.once('value').then(function(snap) {
          if(snap.val() == null){
            return 'icon lricon-like';
          }
          else{
            return 'icon lricon-unlike';
          }
        });
      }
    };
    return Chatroom;

  });
