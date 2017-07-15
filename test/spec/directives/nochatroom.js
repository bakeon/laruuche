'use strict';

describe('Directive: noChatroom', function () {

  // load the directive's module
  beforeEach(module('laruucheApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<no-chatroom></no-chatroom>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the noChatroom directive');
  }));
});
