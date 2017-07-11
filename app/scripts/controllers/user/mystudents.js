'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:MyStudentsCtrl
 * @description
 * # MyStudentsCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('MyStudentsCtrl', function ($rootScope, $scope, Auth, $location, Users, $firebaseObject, Chatrooms) {
    $rootScope.auth = Auth;
    var userUid = '';
    $scope.Chatrooms = Chatrooms;
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
        userUid = $scope.user.$id;
        $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
        $scope.students = Users.getMyStudents(userUid);
      }

      /*Get all students*/
      $scope.students.$loaded().then(function () {
      });

      $scope.getDisplayName = function(uid){
        return Users.getDisplayName(uid);
      }

      $scope.getTrack = function(uid){
        return Users.getTrack(uid);
      };

      /*Accept a student*/
      $scope.acceptStudent = function(studentId){
          /*Me*/
          $scope.user.students[studentId].status = 'accepted';
          $scope.user.$save().then(function () {

          });

          /*My Student*/
          let student = Users.getProfile(studentId);
          student.$loaded().then(function () {
            student.mentors[$scope.user.$id].status = 'accepted';
            student.$save().then(function () {

            });
          });

          /*Create the private Room*/
          let Chatrooms = $scope.Chatrooms.all;
          let newChatroom = {
            uid:$scope.user.$id+studentId,
            name:'Mentor by '+$scope.user.displayName,
            type:'private',
            timestamp:firebase.database.ServerValue.TIMESTAMP,
            mentorId:$scope.user.$id,
            studentId:studentId,
          };
          Chatrooms.$add(newChatroom).then(function () {
            console.log('created');
          });

      };
      /*Refuse a student*/
      $scope.refuseStudent = function(uid){
        /*Me*/
        $scope.user.students[studentId].status = 'refused';
        $scope.user.$save().then(function () {

        });

        /*My Student*/
        let student = Users.getProfile(studentId);
        student.$loaded().then(function () {
          student.mentors[$scope.user.$id].status = 'refused';
          student.$save().then(function () {

          });
        });
      };

      /*Join the private room*/
      $scope.joinPrivateRoom = function(mentorId, studentId){
        let myRoom = firebase.database().ref('chatrooms').orderByChild('uid').equalTo(mentorId+studentId);
        myRoom.on('value', function(snap){
          for(let value in snap.val()){
            $location.path('/panel/chatroom/'+value);
            break;
          }
        });
        console.log(myRoom);
      }

    });
  });
