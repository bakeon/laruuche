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
        $scope.notifications = [];
        /*Load ChatRooms*/
        $scope.chatrooms = Chatrooms;

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
            $scope.ChatroomsList=Users.getRooms(firebaseUser.uid);
            $scope.user.$loaded().then(function () {
                if($scope.user.accessLevel >= 20){
                  /*Create the chatroom*/
                  $scope.newChatroom = {
                    name: '',
                    createdBy:'',
                    createdAt:'',
                    messages:'',
                  };



                  $scope.createChatroom = function(){
                    $scope.newChatroom.createdBy = userUid;
                    $scope.newChatroom.createdAt = firebase.database.ServerValue.TIMESTAMP;
                    $scope.chatrooms.publicRooms.$add($scope.newChatroom).then(function(){
                      $scope.newChatroom = {
                        name: '',
                        createdBy:$scope.user.$id,
                        createdAt:'',
                        messages:'',
                      };

                      $location.path('/userProfile');

                    });
                  };
                }
            });
          }
        });


        $scope.addRoom = function ($event) {
          $scope.room=$event;
        };

        /*Enter to the chatroom*/
        $scope.enterChat = function(id){
          $location.path('/userProfile/chatroom/' + id);
        };

      }]);

})();
