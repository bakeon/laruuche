'use strict';

describe('Service: IsAdmin', function () {

  // load the service's module
  beforeEach(module('laruucheApp'));

  // instantiate service
  var IsAdmin;
  beforeEach(inject(function (_IsAdmin_) {
    IsAdmin = _IsAdmin_;
  }));

  it('should do something', function () {
    expect(!!IsAdmin).toBe(true);
  });

});
