'use strict';

describe('Controller: AmaCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var AmaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AmaCtrl = $controller('AmaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AmaCtrl.awesomeThings.length).toBe(3);
  });
});
