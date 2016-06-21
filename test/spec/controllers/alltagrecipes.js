'use strict';

describe('Controller: AlltagrecipesCtrl', function () {

  // load the controller's module
  beforeEach(module('loveToEatItFrontEndApp'));

  var AlltagrecipesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AlltagrecipesCtrl = $controller('AlltagrecipesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
