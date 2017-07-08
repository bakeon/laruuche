'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('ProfileCtrl', ["$rootScope","$scope", "Auth", "$location","Users", "$timeout", "$q", "Degrees",
      function ($rootScope ,$scope, Auth, $location, Users, $timeout, $q, Degrees) {
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
            $scope.getTags = Users.getTags(firebaseUser.uid);
          }
        });

        /*Data for profile*/
        $scope.userTags = [];
        $scope.userTrack = '';
        $scope.tracks = [
          "S - Scientifique",
          "L - Littéraire",
          "ES - Economique et sociale",
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

        self.readonly = false;

        $scope.updateProfile = function(){
          //$scope.user.tags = $scope.userTags;
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
