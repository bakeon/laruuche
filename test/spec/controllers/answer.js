'use strict';

describe('Controller: AnswerCtrl', function () {

  // load the controller's module
  beforeEach(module('laruucheApp'));

  var AnswerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AnswerCtrl = $controller('AnswerCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(AnswerCtrl.awesomeThings.length).toBe(3);
  });
});
