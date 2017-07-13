'use strict';

describe('Controller: AuthdialogCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var AuthdialogCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthdialogCtrl = $controller('AuthdialogCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AuthdialogCtrl.awesomeThings.length).toBe(3);
  });
});
