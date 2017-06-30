'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('ProfileCtrl', ["$rootScope","$scope", "AuthFactory", "$location" ,function ($rootScope ,$scope, AuthFactory, $location) {
      var auth = AuthFactory;

      $rootScope.auth = AuthFactory;
      if(!$rootScope.firebaseUser){
        $location.path('/login');
      }

      // any time auth state changes, add the user data to scope
      $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
        $rootScope.firebaseUser = firebaseUser;
        if(!$rootScope.firebaseUser){
          $location.path('/login');
        }
      });


      /*Data for profile*/
      $scope.userRole = {
        name: 'Elève'
      };


    }]);

})();
