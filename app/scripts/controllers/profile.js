'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('ProfileCtrl', ["$rootScope","$scope", "Auth", "$location","Users", "$timeout", "$q", "Degrees", "$mdConstant","$mdSidenav",
      function ($rootScope ,$scope, Auth, $location, Users, $timeout, $q, Degrees, $mdConstant, $mdSidenav) {
        var self = this;
        $scope.openLeftMenu = function() {
          $mdSidenav('left').toggle();
        };
        $scope.getTags = '';
        $rootScope.auth = Auth;
        var userRef = firebase.database().ref();
        var User = Users;
        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          if(!$rootScope.firebaseUser){
            $mdDialog.show({
              controller: 'AuthDialogCtrl',
              templateUrl: 'views/authDialog.html',
              parent: angular.element(document.body),
              targetEvent: event,
              clickOutsideToClose: true
            });          }
          else{
            /*Retrieve User Data*/
            $scope.user = Users.getProfile(firebaseUser.uid);
            var getTags = Users.getTags(firebaseUser.uid);
            $scope.tags = [];
            getTags.$loaded().then(function () {
              if(getTags){
                $scope.tags = getTags.$value.split(',');
              }
              else{
                $scope.tags = [];
              }
            });
          }
        });

        /*Data for profile*/
        $scope.userTags = [];
        $scope.userTrack = '';
        $scope.tracks = [
          "S",
          "L",
          "ES",
          "STI2D",
          "ST2S",
          "STL",
          "STMG",
          "Autres"
        ];

        /*Tags for expert*/
        this.customKeys = [$mdConstant.KEY_CODE.ENTER,$mdConstant.KEY_CODE.SPACE];

        $scope.updateProfile = function(){
          $scope.user.tags = $scope.tags.join();
          $scope.user.$save().then(function(){
            //If works redirect To
            console.log("Profile updated");
            $location.path('/userProfile/my-rooms');

          }).catch(function(err){
            console.log(err);
          });
        };



    }]);

})();
