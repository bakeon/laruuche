'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('PanelCtrl', ["$rootScope","$scope", "Auth", "$location", "Users" , "$firebaseObject", "Chatrooms","$mdDialog","$mdSidenav",
      function ($rootScope ,$scope , Auth, $location, Users, $firebaseObject, Chatrooms,$mdDialog,$mdSidenav) {
        $scope.openLeftMenu = function() {
          $mdSidenav('left').toggle();
        };
        $rootScope.auth = Auth;
        var userUid = '';
        $scope.getRoomName='';
        $scope.ChatroomsList='';
        $scope.notifications = [];
        /*Load ChatRooms*/
        $scope.chatrooms = Chatrooms;

        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          $scope.getRoomName = function(uid){
            return Chatrooms.getName(uid);
          };
          if(!$rootScope.firebaseUser){
            $location.path('/');
          }
          else{
            /*Retrieve User Data*/
            $scope.user = Users.getProfile(firebaseUser.uid);
            userUid = $scope.user.$id;
            $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
            $scope.user.$loaded().then(function () {
              $scope.pendingStudents = Users.getNotificationsForUnreadStudents($scope.user.$id);
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
            $scope.refuseStudent = function(uid, index){
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
          console.log('ok');
          $scope.notifications.splice(index ,1);
          $scope.user.students[studentId].read = true;
          $scope.user.$save().then(function () {
          });
        };

        /*Create the chatroom*/
        $scope.newChatroom = {
          name: '',
          createdBy:'',
          createdAt:'',
          messages:'',
        };



        $scope.createChatroom = function(){
          $scope.newChatroom.createdBy = userUid;
          $scope.newChatroom.createdAt = firebase.database.ServerValue.TIMESTAMP;
          $scope.chatrooms.publicRooms.$add($scope.newChatroom).then(function(){
            $scope.newChatroom = {
              name: '',
              createdBy:$scope.user.$id,
              createdAt:'',
              messages:'',
            };

            $location.path('/panel');

          });
        };

        $scope.addRoom = function ($event) {
          $scope.room=$event;
        };

        /*Enter to the chatroom*/
        $scope.enterChat = function(id){
          $location.path('/userProfile/chatroom/' + id);
        };

        $scope.editButton = function(event){
          $mdDialog.show({
            controller: 'AuthDialogCtrl',
            templateUrl: 'views/authDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
          });
        };

        /*Logout*/
        $scope.logout = function(){
          Auth.$signOut().then(function(){
            $rootScope.isLogged=false;
            $scope.user = '';
            $rootScope.firebaseUser = '';
            $location.path('/');
          });
        };

      }]);

})();
