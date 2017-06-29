'use strict';

describe('Service: authFactory', function () {

  // load the service's module
  beforeEach(module('laruucheApp'));

  // instantiate service
  var authFactory;
  beforeEach(inject(function (_authFactory_) {
    authFactory = _authFactory_;
  }));

  it('should do something', function () {
    expect(!!authFactory).toBe(true);
  });

});
