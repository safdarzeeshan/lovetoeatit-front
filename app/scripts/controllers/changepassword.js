'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:ChangepasswordCtrl
 * @description
 * # ChangePasswordCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('ChangePasswordCtrl', function ($scope, Auth, $state,Validate) {

    $scope.password = {};
    $scope.pwdChanged = false;

    $scope.changePassword = function(formData){
        $scope.errors = [];
        Validate.form_validation(formData,$scope.errors);
        if(!formData.$invalid){
            Auth.$changePassword($scope.password)
            .success(function(response){
                console.log(response);
                $scope.pwdChanged = true;
            })
            .catch(function(errors){
                // error case
                $scope.loading = false;
                $scope.errors = errors.data;
            });
        }
    };

    $scope.gotoUserProfile = function(){
        $state.go('user.profile');
    };

});
