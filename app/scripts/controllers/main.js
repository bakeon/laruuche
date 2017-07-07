'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the laruucheApp
 */

angular.module('laruucheApp')

  .controller('MainCtrl', function ($scope, $rootScope, $firebaseObject, Auth) {
    var auth = Auth;

    $rootScope.auth = Auth;

    // any time auth state changes, add the user data to scope
    $rootScope.auth.$onAuthStateChanged(function(firebaseUser) {
      $rootScope.firebaseUser = firebaseUser;
      console.log(firebaseUser);
    });

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.homeTemplate=
      {
          first:{
            title:'1',
            paragraphe:'Explore les domaines qui t\'intéressent',
            icon:'search',
            class:'order-1',
            alignement:'center center'
          },
          second:{
            title:'2',
            paragraphe: 'Rejoins une room pour discuter avec des étudiants',
            icon: 'people',
            class:' order-2',
            alignement:'center center'

          },
          third:{
            title:'3',
            paragraphe:'Choisis un mentor et construis ton avenir',
            icon:'bubble',
            class:'order-1',
            alignement:'center center'


          }
        };
    $scope.homeTemplate2=
      {
        first:{
          title:'1',
          paragraphe:'Inscris toi en tant que mentor',
          class:'order-1',
          alignement:'center center'
        },
        second:{
          title:'2',
          paragraphe: 'Partage ton expérience librement dans les rooms',
          class:' order-2',
          alignement:'center center'

        },
        third:{
          title:'3',
          paragraphe:'Conseilles d\'autres étudiants intéressés par ton domaine',
          icon:'bubble',
          class:'order-1',
          alignement:'center center'


        }
      };


  });
