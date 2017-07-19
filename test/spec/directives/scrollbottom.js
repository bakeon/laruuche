'use strict';

describe('Directive: scrollBottom', function () {

  // load the directive's module
  beforeEach(module('laruucheApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<scroll-bottom></scroll-bottom>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the scrollBottom directive');
  }));
});
