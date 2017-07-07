'use strict';

/**
 * @ngdoc overview
 * @name laruucheApp
 * @description
 * # laruucheApp
 *
 * Main module of the application.
 */
angular
  .module('laruucheApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'firebase',
    'ngMaterial'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/login',{
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/profile',{
        templateUrl: 'views/user/profile.html',
        controller: 'ProfileCtrl as ProfileCtrl'
      })
      .when('/panel',{
        templateUrl: 'views/user/panel.html',
        controller: 'PanelCtrl'
      })
      .when('/panel/chatroom/create',{
        templateUrl: 'views/user/create.html',
        controller: 'PanelCtrl'
      })
      .when('/panel/chatroom/:id',{
        templateUrl: 'views/user/chatroom.html',
        controller: 'ChatRoomCtrl',
      })
      .when('/admin',{
        templateUrl:'views/admin/backoffice.html',
        controller:'BackOfficeCtrl'
      })
      .when('/admin/users',{
        templateUrl:'views/admin/users.html',
        controller:'AdminUsersCtrl'
      })
      .when('/admin/rooms',{
        templateUrl:'views/admin/rooms.html',
        controller:'AdminRoomsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
