'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('AuthCtrl', ["$rootScope","$scope", "AuthFactory","$location" ,function ($rootScope ,$scope, AuthFactory, $location) {
        var auth = AuthFactory;

        $rootScope.auth = AuthFactory;

        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
        });

        $scope.googleSignIn = function(){
          $scope.error = null;

          auth.$signInWithPopup('google').then(function (firebaseUser) {
            $rootScope.firebaseUser = firebaseUser;

            /*Redirect to profile*/
            $location.path('/profile');

          }).catch(function (error) {
            $scope.error = error;
          });
        };

      $scope.fbSignIn = function(){
        var provider = new firebase.auth.FacebookAuthProvider();

        auth.$signInWithPopup(provider).then(function (firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;

          /*Redirect to profile*/

        }).catch(function (error) {
          $scope.error = error;
        });
      };



    }]);

})();
