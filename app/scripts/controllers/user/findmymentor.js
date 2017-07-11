'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:FindMyMentorCtrl
 * @description
 * # FindMyMentorCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('FindMyMentorCtrl',
    function ($rootScope, $scope, Auth, $location, Users, $firebaseObject, Chatrooms) {
      $rootScope.auth = Auth;
      var userUid = '';

      // any time auth state changes, add the user data to scope
      $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
        $rootScope.firebaseUser = firebaseUser;
        $scope.getRoomName = function(uid){
          return Chatrooms.getName(uid);
        };
        if(!$rootScope.firebaseUser){
          $location.path('/login');
        }
        else{
          /*Retrieve User Data*/
          $scope.user = Users.getProfile(firebaseUser.uid);
          console.log($scope.user);
          userUid = $scope.user.$id;
          $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
        }

      });

     $scope.mentors = Users.getMentors();
     $scope.mentors.$loaded().then(function () {
     });


     $scope.askForMentoring = function(uid){
       let mentorNotifs = {
         status:'pending',
         timestamp:firebase.database.ServerValue.TIMESTAMP,
         studentId:$scope.user.$id
       };
       let studentsNotif = {
         status:'pending',
         timestamp:firebase.database.ServerValue.TIMESTAMP,
         mentorId:uid
       };
       /*Add to the mentor*/
        let mentor = firebase.database().ref('users').child(uid);
        mentor.child('students').child($scope.user.$id).update(mentorNotifs);
        /*Add to the student*/
        let student = firebase.database().ref('users').child($scope.user.$id);
        student.child('mentors').child(uid).update(studentsNotif);
     };

     $scope.joinPrivateRoom = function(mentorId, studentId){
        let myRoom = Chatrooms.getPrivateChatroom(mentorId, studentId);
        let roomId = myRoom.$id;
        $location.path('/')
     }
  });
