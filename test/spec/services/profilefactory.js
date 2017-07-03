'use strict';

describe('Service: ProfileFactory', function () {

  // load the service's module
  beforeEach(module('laruucheApp'));

  // instantiate service
  var ProfileFactory;
  beforeEach(inject(function (_ProfileFactory_) {
    ProfileFactory = _ProfileFactory_;
  }));

  it('should do something', function () {
    expect(!!ProfileFactory).toBe(true);
  });

});
