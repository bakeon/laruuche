'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('AuthCtrl', ["$rootScope","$scope", "Auth","$location", "Users" ,
      function ($rootScope ,$scope, Auth, $location, Users) {
        var auth = Auth;

        $rootScope.auth = Auth;


        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          if($rootScope.firebaseUser){
            $location.path('/profile');
          }
        });

        $scope.googleSignIn = function(){
          $scope.error = null;
          var provider = new firebase.auth.GoogleAuthProvider();
          provider.addScope('https://www.googleapis.com/auth/user.birthday.read');
          auth.$signInWithPopup(provider).then(function (firebaseUser) {
            $rootScope.firebaseUser = firebaseUser;
            addUserData(firebaseUser.user.uid, firebaseUser.user.email, firebaseUser.user.displayName);
            /*Redirect to profile*/
            $location.path('/profile');

          }).catch(function (error) {
            $scope.error = error;
          });
        };

      $scope.fbSignIn = function(){
        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        auth.$signInWithPopup(provider).then(function (firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          /*Add user to Database*/
          addUserData(firebaseUser.uid, firebaseUser.email, firebaseUser.displayName);


          /*Redirect to profile*/
          $location.path('/profile');

        }).catch(function (error) {
          $scope.error = error;
        });
      };

      function addUserData(uid, email, displayName){
        var userRef = firebase.database().ref();
        var isUser = Users.getProfile(uid);
        var photo = $rootScope.firebaseUser.photoURL;
        var fname = displayName.split(' ')[0];
        var lname = displayName.split(' ').slice(1).join(' ');
        var user = {
            email:email,
            displayName:displayName,
            firstName:fname,
            lastName:lname,
            photoURL:photo,
            accessLevel:10
        };
        isUser.$loaded().then(function(isUser) {
          if(isUser.email){
            //user exist
          }
          else{
            userRef.child('users').child(uid).set(user);
          }
        });
      }

    }]);

})();
