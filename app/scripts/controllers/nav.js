'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('NavCtrl', function ($scope, $rootScope, $firebaseObject, Auth, Users, Chatrooms) {
    $scope.roomAdded = false;
    let userUid = '';
    $rootScope.auth = Auth;
    $scope.chatrooms = Chatrooms;
    $scope.isLogged = false;

    $rootScope.$on('$routeChangeStart', function(event, next, current){
      console.log(  next.$$route.originalPath);
      if(next.$$route.originalPath == '/userProfile/my-rooms'){
        $scope.roomAdded = false;
      }
    });

    // any time auth state changes, add the user data to scope
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      if(!$rootScope.firebaseUser){
        console.log('anon user');
      }
      else{
        $scope.notifications = [];
        /*Retrieve User Data*/
        $scope.user = Users.getProfile(firebaseUser.uid);
        userUid = $scope.user.$id;
        $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
        $scope.user.$loaded().then(function () {
          $scope.isLogged = true;
          $scope.pendingStudents = Users.getNotificationsForUnreadStudents($scope.user.$id);
          $scope.pendingStudents.$loaded().then(function () {
            $scope.pendingStudents.$watch(function (event) {
              console.log(event);
              let ref = $scope.pendingStudents.$ref();
              let notifications = {
                studentId:event.key,
                studentPhotoURL:Users.getPhotoURL(event.key),
                displayName:Users.getDisplayName(event.key),
                track:Users.getTrack(event.key)
              };
              if(event.event == 'child_added'){
                $scope.notifications.push(notifications);
              }

            });
          });

          /*Get all my rooms*/
          $scope.myChatrooms = Chatrooms.getMyChatrooms($scope.user.$id);
          $scope.myChatrooms.$loaded().then(function () {
            $scope.myChatrooms.$watch(function (event) {
                if(event.event == "child_added"){
                  $scope.roomAdded = true;
                }
            });
          });

        });


        /*Accept a student*/
        $scope.acceptStudent = function(studentId, index){
          /*Me*/
          $scope.user.students[studentId].read = true;
          $scope.user.students[studentId].status = 'accepted';
          $scope.notifications.splice(index ,1);
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
          let Chatrooms = $scope.chatrooms.privateRooms;
          let newChatroom = {
            uid:$scope.user.$id+studentId,
            name:'Mentor by '+$scope.user.displayName,
            timestamp:firebase.database.ServerValue.TIMESTAMP,
            mentorId:$scope.user.$id,
            studentId:studentId,
          };
          Chatrooms.$add(newChatroom).then(function () {
            console.log('created');
          });

        };
        /*Refuse a student*/
        $scope.refuseStudent = function(studentId, index){
          /*Me*/
          $scope.user.students[studentId].read = true;
          $scope.user.students[studentId].status = 'refused';
          $scope.notifications.splice(index ,1);
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

      }
    });

    /*Close the notification*/
    $scope.closeNotif = function(studentId, index){
      $scope.notifications.splice(index ,1);
      $scope.user.students[studentId].read = true;
      $scope.user.$save().then(function () {
      });
    };


  });
