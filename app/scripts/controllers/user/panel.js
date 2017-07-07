'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('PanelCtrl', ["$rootScope","$scope", "Auth", "$location", "Users" , "$firebaseObject", "Chatrooms","$mdDialog",
      function ($rootScope ,$scope , Auth, $location, Users, $firebaseObject, Chatrooms,$mdDialog) {
        $rootScope.auth = Auth;
        var userUid = '';
        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          if(!$rootScope.firebaseUser){
            $location.path('/login');
          }
          else{
            /*Retrieve User Data*/
            $scope.user = Users.getProfile(firebaseUser.uid);
            userUid = $scope.user.$id;
            console.log($rootScope.firebaseUser);
          }
        });

        /*Load ChatRooms*/
        $scope.chatrooms = Chatrooms;
        /*Create the chatroom*/
        $scope.newChatroom = {
          name: '',
          createdBy:'',
          createdAt:'',
          messages:''
        };

        $scope.createChatroom = function(){
          $scope.newChatroom.createdBy = userUid;
          $scope.newChatroom.createdAt = firebase.database.ServerValue.TIMESTAMP;
          $scope.chatrooms.all.$add($scope.newChatroom).then(function(){
            $scope.newChatroom = {
              name: '',
              createdBy:$scope.user.$id,
              createdAt:'',
              messages:''
            };

            $location.path('/panel');

          });
        };

        $scope.addRoom = function ($event) {
          $scope.room=$event;
        };

        /*Enter to the chatroom*/
        $scope.enterChat = function(id){
          $location.path('/panel/chatroom/' +id)
        };

        /*Logout*/
        $scope.logout = function(){
          Auth.$signOut().then(function(){
            $location.path('/');
          });
        };

      }]);

})();
