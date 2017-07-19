'use strict';

describe('Controller: AdminedituserctrlCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var AdminedituserctrlCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminedituserctrlCtrl = $controller('AdminedituserctrlCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminedituserctrlCtrl.awesomeThings.length).toBe(3);
  });
});
