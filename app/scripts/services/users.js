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
      getTrack: function(uid){
        return users.$getRecord(uid).track;
      },
      getRooms :function (uid) {
        return $firebaseObject(usersRef.child(uid).child('roomList'));
      },
      getMentors: function(){
        return $firebaseArray(usersRef.orderByChild('isMentor').equalTo(true));
      },
      getMyStudents : function (uid) {
        return $firebaseObject(usersRef.child(uid).child('students'));
      },
      getNotificationsForUnreadStudents: function(uid){
        return $firebaseArray(usersRef.child(uid).child('students').orderByChild('read').equalTo(false));
      },
      getMyMentors: function (uid) {
        return $firebaseObject(usersRef.child(uid).child('mentors'));
      },
      getStudentInfo : function(uid){
        let user = $firebaseObject(usersRef.child(uid));

        let Student = {
          displayName:user.displayName,
          track:user.track,
          uid:uid
        };

        return Student;
      },
      all: users

    };

    return Users;

  });
