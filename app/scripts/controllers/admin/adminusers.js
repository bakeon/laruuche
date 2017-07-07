'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:AdminUsersCtrl
 * @description
 * # AdminUsersCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('AdminUsersCtrl', ["$location", "$rootScope", "$scope", "Users", "Auth", "$mdDialog",
    function ($location, $rootScope, $scope, Users, Auth, $mdDialog) {
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

        /*User level*/
        $scope.level = [
          {'id':10, "displayName":"Utilisateur"},
          {'id':20, "displayName":"Modérateur"},
          {'id':99, "displayName":"Admin de fou"},
        ]

      $scope.filterLevel = function(value){
          var displayName = '';
          switch (value){
            case 10:
              return displayName= "Utilisateur";
                  break;
            case 20:
              return displayName= "Modérateur";
              break;
            case 99:
              return displayName= "Administrateur";
              break;
            default:
              return displayName= "Utilisateur";
              break;
          }
      }

        $scope.users = Users.all;

        $scope.showEdit = function(user, ev){
          console.log(user);
          $mdDialog.show({
            controller:'AdminEditUserCtrl',
            templateUrl:'views/admin/edituser.html',
            parent:angular.element(document.body),
            targetEvent:ev,
            locals:{
              userToEdit: user
            },
            clickOutsideToClose:true
          }).then(function(user){
            console.log('save');
          }, function(){
            console.log('cancel!');
          });
        };

        $scope.delete = function(uid, ev){
          if($scope.user.accessLevel >= 20){
            var selectedUser = Users.getProfile(uid);
            var confirm = $mdDialog.confirm()
              .title('Voulez-vous supprimer cet utilisateur')
              .textContent('')
              .ariaLabel('Lucky Day')
              .targetEvent(ev)
              .ok('Oui')
              .cancel('Non');

            $mdDialog.show(confirm).then(function() {
              selectedUser.$remove();
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
