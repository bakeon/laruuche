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
            paragraphe:'compare un grand nombre d\'écoles et compare les à tes critères',
            icon:'search',
            class:'order-1',
            alignement:'start center'
          },
          second:{
            title:'2',
            paragraphe: 'Le mentor le plus adéquat à votre profil vous est présenté ',
            icon: 'people',
            class:' order-2',
            alignement:'end center'

          },
          third:{
            title:'3',
            paragraphe:'Discuter et rester en contact avec lui pour partager son expérience et vous recommander sur la formation',
            icon:'bubble',
            class:'order-1',
            alignement:'start center'


          },
          fourth:{
            title:'4',
            paragraphe: 'Trouver votre fomation idéale grâce à des avis privilégiés et concrets',
            icon: 'smiley',
            class:' order-2',
            alignement:'end center'

          }
        };


  });
