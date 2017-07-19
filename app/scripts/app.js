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
  .run(function($rootScope){
    $rootScope.$on('$routeChangeStart', function (evt, next, currentRoute) {
      $rootScope.isActive = next.$$route.routeName;
    });
  })
  .config(function ($routeProvider,$locationProvider,$mdThemingProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        routeName: 'main'
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
        controller: 'ProfileCtrl as ProfileCtrl',
        routeName: 'profile'
      })
      .when('/rooms',{
        templateUrl: 'views/public/rooms.html',
        controller: 'RoomsCtrl as RoomsCtrl',
        routeName: 'rooms'
      })
      .when('/mentors',{
        templateUrl: 'views/public/mentors.html',
        controller: 'MentorsCtrl as MentorsCtrl',
        routeName: 'mentors'

      })
      .when('/schools',{
        templateUrl: 'views/public/school.html',
        controller: 'SchoolCtrl as SchoolCtrl',
        routeName: 'schools'

      })
      .when('/chatroom/:id',{
        templateUrl: 'views/public/chatroom.html',
        controller: 'ChatroomBisCtrl as ChatroomBisCtrl',
      })
      .when('/userProfile/chatroom/create',{
        templateUrl: 'views/user/create.html',
        controller: 'PanelCtrl',
      })
      .when('/userProfile/ama/create',{
        templateUrl: 'views/user/createama.html',
        controller: 'CreateAmaCtrl'
      })
      .when('/ama', {
        templateUrl: 'views/public/ama.html',
        controller: 'AmaCtrl',
        routeName: 'ama'
      })
      .when('/ama/:id', {
        templateUrl: 'views/public/amaroom.html',
        controller: 'StudentAmaCtrl'
      })
      .when('/userProfile/my-ama', {
        templateUrl: 'views/user/myama.html',
        controller: 'MyAmaCtrl',
        routeName: 'my-ama'
      })
      .when('/userProfile/chatroom/:id',{
        templateUrl: 'views/user/chatroom.html',
        controller: 'ChatRoomCtrl as ChatRoomCtrl',
      })
      .when('/userProfile/privateroom/:id',{
        templateUrl: 'views/user/privatechatroom.html',
        controller: 'PrivateChatroomCtrl',
      })
      .when('/userProfile/mentors',{
        templateUrl:'views/user/mentors.html',
        controller: 'FindMyMentorCtrl as fmmCtrl',
        routeName:'mymentors'
      })
      .when('/userProfile/my-students',{
        templateUrl:'views/user/mystudents.html',
        controller: 'MyStudentsCtrl as MyStudentsCtrl',
        routeName: 'mystudents',

      })
      .when('/userProfile/my-mentors',{
        templateUrl:'views/user/mymentors.html',
        controller: 'MyMentorsCtrl as MyMentorsCtrl',
        routeName: 'mymentors'

      })
      .when('/userProfile/my-rooms',{
        templateUrl:'views/user/myrooms.html',
        controller: 'MyRoomsCtrl as MyRoomsCtrl',
        routeName: 'myrooms'

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


    var customPrimary = {
      '50': '#7b7ee0',
      '100': '#676adb',
      '200': '#5256d6',
      '300': '#3e42d1',
      '400': '#2f33c7',
      '500': '#2a2eb2',
      '600': '#25299d',
      '700': '#202389',
      '800': '#1b1e74',
      '900': '#17195f',
      'A100': '#9093e5',
      'A200': '#a5a7ea',
      'A400': '#b9bbef',
      'A700': '#12134b'
    };
    $mdThemingProvider
      .definePalette('customPrimary',
        customPrimary);

    var customAccent = {
      '50': '#4c3d00',
      '100': '#655200',
      '200': '#7f6700',
      '300': '#987b00',
      '400': '#b29000',
      '500': '#cba400',
      '600': '#fece00',
      '700': '#ffd319',
      '800': '#ffd832',
      '900': '#ffdd4c',
      'A100': '#fece00',
      'A200': '#e5b900',
      'A400': '#cba400',
      'A700': '#ffe265'
    };
    $mdThemingProvider
      .definePalette('customAccent',
        customAccent);

    var customWarn = {
      '50': '#ffb280',
      '100': '#ffa266',
      '200': '#ff934d',
      '300': '#ff8333',
      '400': '#ff741a',
      '500': '#ff6400',
      '600': '#e65a00',
      '700': '#cc5000',
      '800': '#b34600',
      '900': '#993c00',
      'A100': '#ffc199',
      'A200': '#ffd1b3',
      'A400': '#ffe0cc',
      'A700': '#803200'
    };
    $mdThemingProvider
      .definePalette('customWarn',
        customWarn);



    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent')
      .warnPalette('customWarn')
  });
