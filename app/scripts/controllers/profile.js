'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('ProfileCtrl', ["$rootScope","$scope", "Auth", "$location","Users", "$timeout", "$q", "Degrees", "$mdConstant",
      function ($rootScope ,$scope, Auth, $location, Users, $timeout, $q, Degrees, $mdConstant) {
        var self = this;
        $scope.getTags = '';
        $rootScope.auth = Auth;
        var userRef = firebase.database().ref();
        var User = Users;
        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          if(!$rootScope.firebaseUser){
            $location.path('/login');
          }
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
          "STMG"
        ];

        $scope.userDegreeLevel = '';
        $scope.degreesLevel = [
          "BTS",
          "DUT",
          "L3",
          "LP",
          "M1",
          "M2",
          "Doctorat"
        ];



        self.simulateQuery = false;
        self.isDisabled    = false;

        // list of `state` value/display objects
        self.degrees        = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;


        /*Create the degree*/
        $scope.newDegree = {
          name: '',
          level:'',
        };
        self.newDegree = newDegree;

        function newDegree(degreeName, degreeLevel) {
          $scope.newDegree.name = degreeName;
          $scope.newDegree.level = degreeLevel;

          Degrees.all.$add($scope.newDegree).then(function(){
            $scope.newDegree = {
              name: '',
              level:''
            };


          });
        }

        // ******************************
        // Internal methods
        // ******************************

        /**
         * Search for degrees... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
          var results = query ? self.degrees.filter( createFilterFor(query) ) : self.degrees,
            deferred;
          if (self.simulateQuery) {
            deferred = $q.defer();
            $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
          } else {
            return results;
          }
        }

        function searchTextChange(text) {
        }

        function selectedItemChange(item) {
        }

        /*ToFix*/
        function loadAll() {
          /*var allDegrees = ''
          return allDegrees.map( function (degree) {
            degree.value = degree.name.toLowerCase();
            return degree;
          });*/
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(degree) {
            return (degree.value.indexOf(lowercaseQuery) === 0);
          };

        }

        /*Tags for expert*/
        this.customKeys = [$mdConstant.KEY_CODE.ENTER,$mdConstant.KEY_CODE.SPACE];

        $scope.updateProfile = function(){
          $scope.user.tags = $scope.tags.join();
          $scope.user.$save().then(function(){
            //If works redirect To
            console.log("Profile updated");
            $location.path('/panel');

          }).catch(function(err){
            console.log(err);
          });
        };



    }]);

})();
