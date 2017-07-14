'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('RoomsCtrl', ["$rootScope","$scope", "Auth", "$location", "Users" , "$firebaseObject", "Chatrooms","$mdDialog","$mdSidenav",
      function ($rootScope ,$scope , Auth, $location, Users, $firebaseObject, Chatrooms,$mdDialog,$mdSidenav) {
        $scope.openLeftMenu = function() {
          $mdSidenav('left').toggle();
        };
        $rootScope.auth = Auth;
        var userUid = '';
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
        });
        /*Load ChatRooms*/

        $scope.chatrooms = Chatrooms;

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
      }]);

})();
