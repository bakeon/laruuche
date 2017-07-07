'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('ProfileCtrl', ["$rootScope","$scope", "Auth", "$location","Users" ,
      function ($rootScope ,$scope, Auth, $location, Users) {
        $rootScope.auth = Auth;
        var userRef = firebase.database().ref();

        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          if(!$rootScope.firebaseUser){
            $location.path('/login');
            console.log($rootScope.firebaseUser);
          }
          else{
            /*Retrieve User Data*/
            $scope.user = Users.getProfile(firebaseUser.uid);
          }
        });

        $scope.user


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

        $scope.updateProfile = function(){
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
