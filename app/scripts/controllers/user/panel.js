'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('PanelCtrl', ["$rootScope","$scope", "AuthFactory", "$location","ProfileFactory" ,
      function ($rootScope ,$scope, AuthFactory, $location, ProfileFactory) {
        $rootScope.auth = AuthFactory;
        var userRef = firebase.database().ref();

        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          if(!$rootScope.firebaseUser){
            $location.path('/login');
          }
          else{
            /*Retrieve User Data*/
            $scope.user = ProfileFactory(firebaseUser.uid);
          }

        });



      }]);

})();
