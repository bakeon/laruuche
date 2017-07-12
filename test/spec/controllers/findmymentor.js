'use strict';

describe('Controller: FindmymentorCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var FindmymentorCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FindmymentorCtrl = $controller('FindmymentorCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(FindmymentorCtrl.awesomeThings.length).toBe(3);
  });
});
