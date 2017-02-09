'use strict';

describe('Controller: SubmitrecipeadminCtrl', function () {

  // load the controller's module
  beforeEach(module('loveToEatItFrontEndApp'));

  var SubmitrecipeadminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SubmitrecipeadminCtrl = $controller('SubmitrecipeadminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
