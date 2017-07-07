'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:AdminRoomsCtrl
 * @description
 * # AdminRoomsCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('AdminRoomsCtrl',  ["$location", "$rootScope", "$scope", "Users", "Auth", "$mdDialog", "Chatrooms",
    function ($location, $rootScope, $scope, Users, Auth, $mdDialog, Chatrooms) {
    var self = this;

      $rootScope.auth = Auth;
      var userRef = firebase.database().ref();
      // any time auth state changes, add the user data to scope
      $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
        $rootScope.firebaseUser = firebaseUser;
        if(!$rootScope.firebaseUser){
          $location.path('/login');
        }
        else if($rootScope.firebaseUser){
          /*Retrieve User Data*/
          $scope.user = Users.getProfile(firebaseUser.uid);
          var userLevel = Users.getProfile(firebaseUser.uid);
          userLevel.$loaded().then(function (userLevel) {
            userLevel = $scope.user.accessLevel;
            if(userLevel < 20){
              $location.path('/');
            }
            else{
              console.log('You are login as admin');
            }
          });

        }
      });

      $scope.rooms = Chatrooms.all;
      $scope.getUsername = function(uid){
        return Users.getDisplayName(uid);
      }

      $scope.showEdit = function(room, ev){
        $mdDialog.show({
          controller:'AdminEditRoomCtrl',
          templateUrl:'views/admin/editroom.html',
          parent:angular.element(document.body),
          targetEvent:ev,
          locals:{
            roomToEdit: room
          },
          clickOutsideToClose:true
        }).then(function(room){
          console.log('save');
        }, function(){
          console.log('cancel!');
        });
      };

      $scope.delete = function(uid, ev){
        if($scope.user.accessLevel >= 20){
          var selectedRoom = Chatrooms.getRoom(uid);
          var confirm = $mdDialog.confirm()
            .title('Voulez-vous supprimer cette room?')
            .textContent('')
            .ariaLabel('Lucky Day')
            .targetEvent(ev)
            .ok('Oui')
            .cancel('Non');

          $mdDialog.show(confirm).then(function() {
            selectedRoom.$remove();
          }, function() {
            console.log('Non!')
          });
        }
        else{
          console.log('Fuck u!');
        }
      }



    }

  ]);
