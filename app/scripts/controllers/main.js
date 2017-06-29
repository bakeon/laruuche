'use strict';

/**
 * @ngdoc function
 * @name laruucheApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the laruucheApp
 */

angular.module('laruucheApp')

  .controller('MainCtrl', function ($scope, $firebaseObject, $route) {

    console.log($route.routes);
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];


  });
