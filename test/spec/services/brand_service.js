'use strict';

describe('Service: brandService', function () {

  // load the service's module
  beforeEach(module('loveToEatItFrontEndApp'));

  // instantiate service
  var brandService;
  beforeEach(inject(function (_brandService_) {
    brandService = _brandService_;
  }));

  it('should do something', function () {
    expect(!!brandService).toBe(true);
  });

});
