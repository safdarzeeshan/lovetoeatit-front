'use strict';

describe('Controller: PasswordresetConfirmCtrl', function () {

  // load the controller's module
  beforeEach(module('loveToEatItFrontEndApp'));

  var PasswordresetConfirmCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PasswordresetConfirmCtrl = $controller('PasswordresetConfirmCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
