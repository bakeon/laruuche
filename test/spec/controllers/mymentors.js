'use strict';

describe('Controller: MymentorsCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var MymentorsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MymentorsCtrl = $controller('MymentorsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MymentorsCtrl.awesomeThings.length).toBe(3);
  });
});
