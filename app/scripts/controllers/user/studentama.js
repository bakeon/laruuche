'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:StudentAmaCtrl
 * @description
 * # StudentAmaCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('StudentAmaCtrl', function ($rootScope, $scope, $routeParams, Users, Auth, Messages, Chatrooms, $firebaseObject,$mdSidenav, $mdDialog) {
    $scope.openLeftMenu = function() {
      $mdSidenav('left').toggle();
    };
    // any time auth state changes, add the user data to scope
    $scope.isStudent = false;
    $rootScope.auth = Auth;
    $scope.user = '';
    $scope.amaName = '';
    $scope.ama = '';
    $scope.getUserName = '';
    $scope.getRoomName = '';
    $scope.ChatroomsList='';
    let chatrooms = Chatrooms.amaRooms;

    /*Get the room object*/
    $scope.ChatRoomObj = Chatrooms.getAmaRoom($routeParams.id);

    chatrooms.$loaded().then(function () {
      $scope.ama = chatrooms.$getRecord($routeParams.id);
      $scope.questions = Messages.getAmaChatQuestions($routeParams.id);
      $.each($scope.questions, function (index, value) {
        console.log(index);
      });
      $scope.getUserName = function (uid) {
        return Users.getDisplayName(uid);
      };
      $scope.getPhotoURL = function(uid){
        return Users.getPhotoURL(uid);
      }

    });

    $rootScope.auth.$onAuthStateChanged(function (firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      $scope.getRoomName = function (uid) {
        return Chatrooms.getAmaName(uid);
      };

      if (!$rootScope.firebaseUser) {
        $location.path('/');
      }
      else {
        /*Retrieve User Data*/
        $scope.user = Users.getProfile(firebaseUser.uid);

        $scope.user.$loaded().then(function () {
          //Do all things when user is logged;
          $scope.ChatRoomObj.$loaded().then(function () {
            $scope.amaName = $scope.ChatRoomObj.name;

          });

          if(!$scope.user.isMentor){
            $scope.isStudent = true;
          }

          /*Tofix : modify class for like/unlike*/
          $scope.isLiked = function(questionId){
            Messages.getMyLike($routeParams.id, questionId, $scope.user.$id).then(function(result){
              return result;
            });
          }

        });

        $scope.ChatroomsList = Users.getRooms(firebaseUser.uid);
      }
    });

    $scope.likeArray = [];

        let chatMessagesRef = firebase.database().ref('chatrooms');
        let ref = chatMessagesRef.child('ama').child($routeParams.id).child('questions');
        ref.on('value', function(snap){
          let like = {};
          snap.forEach(function (childSnap) {
            let key = childSnap.key;
            if(childSnap.val().likes){
              let nLike = Object.keys(childSnap.val().likes).length;
              if(nLike > 0){
                like[key] = "+"+nLike;
              }
              else{
                like[key] = "";
              }
            }
          });
          $scope.likeArray = like;
        });

    $scope.question = '';

    $scope.sendQuestion = function () {
      console.log($scope.question);
      if ($scope.question.length > 0) {
        console.log('send question!', $scope.question);
        $scope.questions.$add({
            uid: $scope.user.$id,
            body: $scope.question,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            answer: ''
          }).then(function () {
            $scope.question = '';
          });
      };
    };

    $scope.setAnswer = function(event, questionId){
      $mdDialog.show({
        controller: 'AnswerCtrl',
        templateUrl: 'views/user/answerDialog.html',
        parent: angular.element(document.body),
        targetEvent: event,
        locals: {
          chatroomId: $routeParams.id,
          questionId : questionId
        },
        clickOutsideToClose: true
      });
    };

    $scope.likeQuestion = function(questionId){
      Messages.addLikeOrDislikeQuestion($routeParams.id, questionId, $scope.user.$id);
    }

  });
