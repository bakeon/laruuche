'use strict';

describe('Controller: CreateamaCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var CreateamaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateamaCtrl = $controller('CreateamaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateamaCtrl.awesomeThings.length).toBe(3);
  });
});
