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
        $scope.user.$loaded().then(function () {
          //Do things when user is logged;
          userUid = $scope.user.$id;
          $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
          $scope.students = Users.getMyStudents(userUid);

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
            $scope.user.students[studentId].read = true;
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
            let Chatrooms = $scope.Chatrooms.privateRooms;
            let newChatroom = {
              uid:$scope.user.$id+studentId,
              name:'Mentor by '+$scope.user.displayName,
              timestamp:firebase.database.ServerValue.TIMESTAMP,
              mentorId:$scope.user.$id,
              studentId:studentId,
            };
            Chatrooms.$add(newChatroom).then(function () {
            });

          };
          /*Refuse a student*/
          $scope.refuseStudent = function(uid){
            /*Me*/
            $scope.user.students[studentId].status = 'refused';
            $scope.user.students[studentId].read = true;
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
            let myRoom = firebase.database().ref('chatrooms').child('private').orderByChild('uid').equalTo(mentorId+studentId);
            myRoom.on('value', function(snap){
              for(let value in snap.val()){
                $location.path('/panel/privateroom/'+value);
                break;
              }
            });
          }

        });

      }

    });
  });
