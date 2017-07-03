'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('ProfileCtrl', ["$rootScope","$scope", "AuthFactory", "$location","ProfileFactory" ,
      function ($rootScope ,$scope, AuthFactory, $location, ProfileFactory) {
        $rootScope.auth = AuthFactory;
        var userRef = firebase.database().ref();

        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          if(!$rootScope.firebaseUser){
            $location.path('/login');
          }
          /*Retrieve User Data*/
          $scope.user = ProfileFactory(firebaseUser.uid);
        });




        /*Data for profile*/
        $scope.userRole = {
          name: 'Elève'
        };

        $scope.userTrack = '';
        $scope.tracks = [
          "S - Scientifique",
          "L - Littéraire",
          "ES - Economique et sociale",
        ];

        $scope.saveProfile = function(){
          $scope.user.$save().then(function(){
            //If works redirect To
            console.log("Profile updated");
            $location.path('/panel');

          }).catch(function(err){
            console.log(err);
          })
        };



    }]);

})();
