'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:AnswerCtrl
 * @description
 * # AnswerCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('AnswerCtrl', function ($rootScope, $scope, $mdDialog, Messages, questionId, chatroomId, Users) {
    $scope.questionId = questionId;
    $scope.chatroomId = chatroomId;

    console.log('chatroomId', chatroomId);
    // any time auth state changes, add the user data to scope
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      if(!$rootScope.firebaseUser){
        $location.path('/');
      }
      else{
        $scope.isLogged = true;
        /*Retrieve User Data*/
        $scope.user = Users.getProfile(firebaseUser.uid);
        $scope.user.$loaded().then(function () {
            $scope.question = Messages.getAmaQuestion(chatroomId, questionId);
            $scope.question.$loaded().then(function () {
              console.log($scope.question);
            });
        });
      }
    });

    $scope.sendAnswer = function(){
      $mdDialog.hide();
      $scope.question.$save().then(function(){
        console.log("Answer saved!");

      }).catch(function(err){
        console.log(err);
      });
    };

  });
