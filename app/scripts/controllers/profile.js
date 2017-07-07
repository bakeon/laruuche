'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('ProfileCtrl', ["$rootScope","$scope", "Auth", "$location","Users", "$timeout", "$q",
      function ($rootScope ,$scope, Auth, $location, Users, $timeout, $q) {
        var self = this;
        $rootScope.auth = Auth;
        var userRef = firebase.database().ref();

        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          if(!$rootScope.firebaseUser){
            $location.path('/login');
          }
          else{
            /*Retrieve User Data*/
            $scope.user = Users.getProfile(firebaseUser.uid);
          }
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

        self.simulateQuery = false;
        self.isDisabled    = false;

        // list of `state` value/display objects
        self.states        = loadAll();
        self.querySearch   = querySearch;
        self.selectedItemChange = selectedItemChange;
        self.searchTextChange   = searchTextChange;

        self.newState = newState;

        function newState(state) {
          alert("Sorry! You'll need to create a Constitution for " + state + " first!");
        }

        // ******************************
        // Internal methods
        // ******************************

        /**
         * Search for states... use $timeout to simulate
         * remote dataservice call.
         */
        function querySearch (query) {
          var results = query ? self.states.filter( createFilterFor(query) ) : self.states,
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

        /**
         * Build `states` list of key/value pairs
         */
        function loadAll() {
          var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';

          return allStates.split(/, +/g).map( function (state) {
            return {
              value: state.toLowerCase(),
              display: state
            };
          });
        }

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);

          return function filterFn(state) {
            return (state.value.indexOf(lowercaseQuery) === 0);
          };

        }

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
