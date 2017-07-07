'use strict';

describe('Service: Degrees', function () {

  // load the service's module
  beforeEach(module('laruucheApp'));

  // instantiate service
  var Degrees;
  beforeEach(inject(function (_Degrees_) {
    Degrees = _Degrees_;
  }));

  it('should do something', function () {
    expect(!!Degrees).toBe(true);
  });

});
