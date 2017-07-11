'use strict';

describe('Controller: MystudentsCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var MystudentsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MystudentsCtrl = $controller('MystudentsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MystudentsCtrl.awesomeThings.length).toBe(3);
  });
});
