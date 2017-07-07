'use strict';

describe('Controller: AdminusersctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var AdminusersctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminusersctrlCtrl = $controller('AdminusersctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminusersctrlCtrl.awesomeThings.length).toBe(3);
  });
});
