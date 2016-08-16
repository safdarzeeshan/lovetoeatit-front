'use strict';

describe('Service: validateService', function () {

  // load the service's module
  beforeEach(module('loveToEatItFrontEndApp'));

  // instantiate service
  var validateService;
  beforeEach(inject(function (_validateService_) {
    validateService = _validateService_;
  }));

  it('should do something', function () {
    expect(!!validateService).toBe(true);
  });

});
