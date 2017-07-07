'use strict';

describe('Controller: AdmineditroomCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var AdmineditroomCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdmineditroomCtrl = $controller('AdmineditroomCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AdmineditroomCtrl.awesomeThings.length).toBe(3);
  });
});
