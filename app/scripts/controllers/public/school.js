'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('SchoolCtrl', ["$rootScope","$scope", "Auth", "$location", "Users" , "$firebaseObject", "Schools","$mdDialog",
      function ($rootScope ,$scope , Auth, $location, Users, $firebaseObject, Schools,$mdDialog) {
        $rootScope.auth = Auth;
        var userUid = '';

        $scope.schools = Schools.all;
        console.log($scope.schools);

        $rootScope.auth.$onAuthStateChanged(function (firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
        });

        $scope.addSchoolToUser = function () {
          if (!$rootScope.firebaseUser) {
            $mdDialog.show({
              controller: 'AuthDialogCtrl',
              templateUrl: 'views/authDialog.html',
              parent: angular.element(document.body),
              targetEvent: event,
              clickOutsideToClose: true
            });
          }
          else {

          }
        };
      }]);

})();
