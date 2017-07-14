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
      .when('/userProfile',{
        templateUrl: 'views/user/userProfile.html',
        controller: 'ProfileCtrl as ProfileCtrl'
      })
      .when('/rooms',{
        templateUrl: 'views/user/rooms.html',
        controller: 'PanelCtrl'
      })
      .when('/mentors',{
        templateUrl: 'views/user/mentors.html',
        controller: 'PanelCtrl'
      })
      .when('/userProfile/chatroom/create',{
        templateUrl: 'views/user/create.html',
        controller: 'PanelCtrl'
      })
      .when('/userProfile/chatroom/:id',{
        templateUrl: 'views/user/chatroom.html',
        controller: 'ChatRoomCtrl',
      })
      .when('/userProfile/privateroom/:id',{
        templateUrl: 'views/user/privatechatroom.html',
        controller: 'PrivateChatroomCtrl',
      })
      .when('/userProfile/mentors',{
        templateUrl:'views/user/mentors.html',
        controller: 'FindMyMentorCtrl as fmmCtrl'
      })
      .when('/userProfile/my-students',{
        templateUrl:'views/user/mystudents.html',
        controller: 'MyStudentsCtrl as MyStudentsCtrl'
      })
      .when('/userProfile/my-mentors',{
        templateUrl:'views/user/mymentors.html',
        controller: 'MyMentorsCtrl as MyMentorsCtrl'
      })
      .when('/userProfile/my-rooms',{
        templateUrl:'views/user/myrooms.html',
        controller: 'MyRoomsCtrl as MyRoomsCtrl'
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
