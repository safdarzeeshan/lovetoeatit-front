'use strict';

describe('Controller: InstagramconnectCtrl', function () {

  // load the controller's module
  beforeEach(module('loveToEatItFrontEndApp'));

  var InstagramconnectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InstagramconnectCtrl = $controller('InstagramconnectCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
