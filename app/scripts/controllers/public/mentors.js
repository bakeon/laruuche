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
        });
        /*Load ChatRooms*/
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
