'use strict';

describe('Controller: StudentamaCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var StudentamaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StudentamaCtrl = $controller('StudentamaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(StudentamaCtrl.awesomeThings.length).toBe(3);
  });
});
