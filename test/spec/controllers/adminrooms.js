'use strict';

describe('Controller: AdminroomsCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var AdminroomsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminroomsCtrl = $controller('AdminroomsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdminroomsCtrl.awesomeThings.length).toBe(3);
  });
});
