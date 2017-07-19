'use strict';

/**
 * @ngdoc directive
 * @name laruucheApp.directive:scrollBottom
 * @description
 * # scrollBottom
 */
angular.module('laruucheApp')
  .directive('scrollBottom', function () {
    return {
      scope: {
        scrollBottom: '='
      },
      link: function(scope, element){
        scope.$watchCollection('scrollBottom', function(newValue){
          if(newValue){
            return $(element).scrollTop($(element).prop("scrollHeight"));
          }
        })
      }
    }
  });
