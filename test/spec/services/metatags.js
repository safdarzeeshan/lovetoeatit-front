'use strict';

describe('Service: Metatags', function () {

  // load the service's module
  beforeEach(module('loveToEatItFrontEndApp'));

  // instantiate service
  var Metatags;
  beforeEach(inject(function (_Metatags_) {
    Metatags = _Metatags_;
  }));

  it('should do something', function () {
    expect(!!Metatags).toBe(true);
  });

});
