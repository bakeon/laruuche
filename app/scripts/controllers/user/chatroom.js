/**
 * @ngdoc function
 * @name laruucheApp.controller:ChatroomCtrl
 * @description
 * # ChatroomCtrl
 * Controller of the laruucheApp
 */
angular.module('laruucheApp')
  .controller('ChatRoomCtrl', ["$rootScope", "$scope", "$routeParams", "Users", "Auth", "Messages", "Chatrooms", "$firebaseObject",
    function ($rootScope, $scope, $routeParams, Users, Auth, Messages, Chatrooms, $firebaseObject) {
      // any time auth state changes, add the user data to scope
      $rootScope.auth = Auth;
      $scope.user = '';
      $scope.chatroomName = '';
      $scope.chatroom = '';
      $scope.getUserName = '';
      $scope.getRoomName = '';
      $scope.ChatroomsList='';
      let chatrooms = Chatrooms.all;
      let chatRef = firebase.database().ref('chatrooms');

      /*Get the room object*/
      $scope.ChatRoomObj = Chatrooms.getRoom($routeParams.id);

      chatrooms.$loaded().then(function () {
        $scope.chatroom = chatrooms.$getRecord($routeParams.id);
        $scope.chatroomName = chatrooms.$getRecord($routeParams.id).name;
        $scope.messages = Messages.getChatMessages($routeParams.id);
        $.each($scope.messages, function (index, value) {
          console.log(index);
        });
        $scope.getUserName = function (uid) {
          return Users.getDisplayName(uid);
        }
        $scope.getPhotoURL = function(uid){
          return Users.getPhotoURL(uid);
        }



      });

      $rootScope.auth.$onAuthStateChanged(function (firebaseUser) {
        $rootScope.firebaseUser = firebaseUser;
        $scope.getRoomName = function (uid) {
          return Chatrooms.getName(uid);
        };

        if (!$rootScope.firebaseUser) {
          $location.path('/login');
        }
        else {
          /*Retrieve User Data*/
          $scope.user = Users.getProfile(firebaseUser.uid);

          $scope.user.$loaded().then(function () {
            //Do all things when user is logged;
            /*Audiochat for mentoring*/
            $scope.ChatRoomObj.$loaded().then(function () {
              if($scope.ChatRoomObj.type === 'private'){
                let yourId, fromUser, pc;
                if($scope.user.isMentor){
                  console.log('I am Mentor!');
                  yourId = $scope.ChatRoomObj.mentorId;
                  fromUser = $scope.ChatRoomObj.studentId;
                }
                else{
                  console.log('I am Student!');
                  fromUser = $scope.ChatRoomObj.mentorId;
                  yourId = $scope.ChatRoomObj.studentId;
                }

                let database = firebase.database().ref('chatrooms').child($scope.ChatRoomObj.$id).child('audio');
                let yourAudio = document.getElementById("localaudio");
                let friendsAudio = document.getElementById("remoteaudio");
                let servers = {'iceServers': [{'urls': 'stun:stun.services.mozilla.com'}, {'urls': 'stun:stun.l.google.com:19302'}, {'urls': 'turn:numb.viagenie.ca','credential': 'webrtc','username': 'websitebeaver@mail.com'}]};

                function sendAudio(senderId, data){
                  let audio = database.push({sender:senderId, audioMsg:data});
                  audio.remove();
                }

                function readAudio(data) {
                  let audio = JSON.parse(data.val().audioMsg);
                  let sender = data.val().sender;
                  if (sender != yourId) {
                    if (audio.ice != undefined)
                      pc.addIceCandidate(new RTCIceCandidate(audio.ice));
                    else if (audio.sdp.type == "offer")
                      pc.setRemoteDescription(new RTCSessionDescription(audio.sdp))
                        .then(() => pc.createAnswer())
                        .then(answer => pc.setLocalDescription(answer))
                        .then(() => sendAudio(yourId, JSON.stringify({'sdp': pc.localDescription})));
                    else if (audio.sdp.type == "answer")
                      pc.setRemoteDescription(new RTCSessionDescription(audio.sdp));
                  };

                };

                function getMyAudio(){
                  navigator.mediaDevices.getUserMedia({audio:true, video:false})
                    .then(stream => yourAudio.srcObject = stream)
                    .then(stream => pc.addStream(stream))
                };

                function getHisAudio(){
                  pc.createOffer()
                    .then(offer => pc.setLocalDescription(offer))
                    .then(() => sendAudio(yourId, JSON.stringify({'sdp':pc.localDescription})) );
                };

                let onlineRef = firebase.database().ref('chatrooms').child($scope.ChatRoomObj.$id).child('online');
                onlineRef.child($scope.user.$id).set({online:true});
                onlineRef.on('value', function(snap){
                  console.log(snap.numChildren() == 2);
                  onlineRef.child($scope.user.$id).onDisconnect().remove();
                  if(snap.numChildren() == 2){
                    //delay the vocal
                    pc = new RTCPeerConnection(servers);
                    pc.onicecandidate = (event => event.candidate?sendAudio(yourId, JSON.stringify({'ice': event.candidate})):console.log("Sent All Ice") );
                    pc.onaddstream = (event => friendsAudio.srcObject = event.stream);
                    getMyAudio();
                    document.addEventListener("click", function(){
                      getHisAudio();
                    });
                  }
                  else{
                    if(pc){
                      pc.close();
                    }
                  }

                });
                database.on('child_added', readAudio);

              }
            });

          });

          /*Add user to the chatroom*/
          $scope.ChatroomsList = Users.getRooms(firebaseUser.uid);
        }
      });



      $scope.message = '';
      $scope.sendMessage = function () {
        if ($scope.message.length > 0) {
          $scope.messages.$add({
            uid: $scope.user.$id,
            body: $scope.message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
          }).then(function () {
            $scope.message = '';
          });
        };
      };

      let room = [];
      $scope.addRoomToUser = function () {
        let roomToAdd = $routeParams.id;
        let exist;
        let userRef = firebase.database().ref().child('users').child(firebaseUser.uid).child('roomList');
        userRef.once('value').then(function (snapshot) {
          room = snapshot.val();
          if (room == null) {
            room = new Array();
            room[0] = roomToAdd;
          }
          else {
            room.forEach(function (value) {
              if (value==roomToAdd){
                exist=true;
              }
              else{
                exist=false
              }
            });
            if(exist==false){
              room.push(roomToAdd);
            }
          }
          console.log(room);
          userRef.set(room);
        });
        /*let isUser = Users.getProfile(uid);
         isUser.$loaded().then(function(isUser) {
         if(isUser.email){
         //user exist
         }
         else{
         userRef.child('users').child('room').set(user);
         }
         });*/
      };

      $scope.enterChat = function (id) {
        $location.path('/panel/chatroom/' + id);
      };




    }]);
