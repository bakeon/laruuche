'use strict';

'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('MentorsCtrl', ["$rootScope","$scope", "Auth", "$location", "Users" , "$firebaseObject", "Chatrooms","$mdDialog","$mdSidenav",
      function ($rootScope ,$scope , Auth, $location, Users, $firebaseObject, Chatrooms,$mdDialog,$mdSidenav) {
        $rootScope.auth = Auth;
        var userUid = '';
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          if($rootScope.firebaseUser){
            /*Retrieve User Data*/
            $scope.user = Users.getProfile(firebaseUser.uid);
            if(!$scope.user.isMentor){
              $location.path('/userProfile')
            }
          }
        });
        /*Load mentors*/
        $scope.mentors=Users.getMentors();
        /*Enter to the chatroom*/
        $scope.enterChat = function(id){
          if(!$rootScope.firebaseUser){
            $mdDialog.show({
              controller: 'AuthDialogCtrl',
              templateUrl: 'views/authDialog.html',
              parent: angular.element(document.body),
              targetEvent: event,
              clickOutsideToClose: true
            });
          }
          else{
            $location.path('/userProfile/chatroom/' + id);
          }
        };
        $scope.askForMentoring = function(uid){
          if(!$rootScope.firebaseUser){
            $mdDialog.show({
              controller: 'AuthDialogCtrl',
              templateUrl: 'views/authDialog.html',
              parent: angular.element(document.body),
              targetEvent: event,
              clickOutsideToClose: true
            });
          }else{
            let mentorNotifs = {
              read:false,
              status:'pending',
              timestamp:firebase.database.ServerValue.TIMESTAMP,
              studentId:$scope.user.$id
            };
            let studentsNotif = {
              read:false,
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
          }
        };

        /*Join the private room*/
        $scope.joinPrivateRoom = function(mentorId, studentId){
          if(!$rootScope.firebaseUser){
            $mdDialog.show({
              controller: 'AuthDialogCtrl',
              templateUrl: 'views/authDialog.html',
              parent: angular.element(document.body),
              targetEvent: event,
              clickOutsideToClose: true
            });
          }else{
            let myRoom = firebase.database().ref('chatrooms').child('private').orderByChild('uid').equalTo(mentorId+studentId);
            myRoom.on('value', function(snap){
              for(let value in snap.val()){
                $location.path('/panel/privateroom/'+value);
                break;
              }
            });
          }
        }
      }]);

})();
