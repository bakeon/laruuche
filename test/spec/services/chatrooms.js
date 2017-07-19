'use strict';

describe('Service: Chatrooms', function () {

  // load the service's module
  beforeEach(module('laruucheApp'));

  // instantiate service
  var Chatrooms;
  beforeEach(inject(function (_Chatrooms_) {
    Chatrooms = _Chatrooms_;
  }));

  it('should do something', function () {
    expect(!!Chatrooms).toBe(true);
  });

});
