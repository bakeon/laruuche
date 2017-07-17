'use strict';

(function () {
  angular.module('laruucheApp')
    .controller('SchoolCtrl', ["$rootScope","$scope", "Auth", "$location", "Users" , "$firebaseObject", "Chatrooms","$mdDialog",
      function ($rootScope ,$scope , Auth, $location, Users, $firebaseObject, Chatrooms,$mdDialog) {
        $rootScope.auth = Auth;
        var userUid = '';

        /*$('body').on('click',function () {
          console.log('coucou!');
        });
        let body = $('body');


        let connectDatabaseApi = function () {
          $.ajax({
            type: "POST",
            url: "https://api.opendata.onisep.fr/api/1.0/login",
            data: {email: 'e.thieffry62930@gmail.com', password: 'BakeOn_2'},
            dataType: 'json',
            success: function (json) {
              console.log(json);
              let token = database.ref("token");
              token.set(json.token);
            }
          });
        };

        let checkTokenDatabase = function () {
          let dateToken = firebase.database.ref("dateAccesToken");
          dateToken.once('value').then(function (snapshot) {
            let date = snapshot.val();
            if (!date) {
              connectDatabaseApi();
              var a = moment().add(1, 'day').toJSON();
              dateToken.set(a);
            } else {
              if (moment().isBefore(date)) {
              } else {
                connectDatabaseApi();
              }
            }
          })
        };
        body.on('click', '.get-more', function () {
          console.log('get more');
          var target = $(this).data('target');
          console.log(target);
          $(this).toggleClass('open');
          $('.school-' + target + '').toggleClass('open');
          $('.school-' + target + ' .more').toggleClass('hide');
        });

        body.on('click', '#search', function () {
          checkTokenDatabase();
        });
        body.on('click', '#recherche', function () {
          var a = $('#search').val();
          let token = database.ref("token");
          token.once('value').then(function (snapshot) {
            let tokenNumber = snapshot.val();
            console.log(tokenNumber);
            $.ajax({
              type: "GET",
              headers: {
                Accept: 'application/json',
                Authorization: tokenNumber
              },
              url: 'https://api.opendata.onisep.fr/api/1.0/dataset/57daa4c40a4e7/search',
              data: {
                q: a,
                size: 10,
              },
              dataType: 'json',
              success: function (json) {
                console.log(json);
                var html = '';
                if (json.results.length > 0) {
                  for (var i = 0; i < json.results.length; i++) {
                    var b = json.results[i].code_rome;
                    console.log(b);
                    $.ajax({
                      type: "GET",
                      headers: {Accept: 'application/json'},
                      url: 'https://api.opendata.onisep.fr/api/1.0/dataset/lheo/search?q=' + b + '&size=10',
                      dataType: 'json',
                      success: function (json) {
                        html += '<div>formation' + i + '</div>';
                      }
                    });
                  }
                }
                else {
                  $('#results').html('<h1>no results</h1>');
                }

              }
            });
          })
        });*/
      }]);

})();
