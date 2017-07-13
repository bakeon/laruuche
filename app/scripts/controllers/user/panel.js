'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('PanelCtrl', ["$rootScope","$scope", "Auth", "$location", "Users" , "$firebaseObject", "Chatrooms","$mdDialog","$mdSidenav",
      function ($rootScope ,$scope , Auth, $location, Users, $firebaseObject, Chatrooms,$mdDialog,$mdSidenav) {
        $scope.openLeftMenu = function() {
          $mdSidenav('left').toggle();
        };
        $rootScope.auth = Auth;
        var userUid = '';
        $scope.getRoomName='';
        $scope.ChatroomsList='';
        // any time auth state changes, add the user data to scope
        $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
          $rootScope.firebaseUser = firebaseUser;
          $scope.getRoomName = function(uid){
            return Chatrooms.getName(uid);
          };
          if(!$rootScope.firebaseUser){
            $location.path('/');
          }
          else{
            /*Retrieve User Data*/
            $scope.user = Users.getProfile(firebaseUser.uid);
            userUid = $scope.user.$id;
            console.log($rootScope.firebaseUser);
            $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
          }
        });

        /*Load ChatRooms*/
        $scope.chatrooms = Chatrooms;
        /*Create the chatroom*/
        $scope.newChatroom = {
          name: '',
          createdBy:'',
          createdAt:'',
          messages:'',
          type:'public'
        };

        $scope.createChatroom = function(){
          $scope.newChatroom.createdBy = userUid;
          $scope.newChatroom.createdAt = firebase.database.ServerValue.TIMESTAMP;
          $scope.chatrooms.all.$add($scope.newChatroom).then(function(){
            $scope.newChatroom = {
              name: '',
              createdBy:$scope.user.$id,
              createdAt:'',
              messages:'',
              type:'public'
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

        $scope.editButton = function(event){
          $mdDialog.show({
            controller: 'AuthDialogCtrl',
            templateUrl: 'views/authDialog.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true
          });
        };

        /*Logout*/
        $scope.logout = function(){
          Auth.$signOut().then(function(){
            $scope.user = '';
            $rootScope.firebaseUser = '';
            $location.path('/');
          });
        };

      }]);

})();
