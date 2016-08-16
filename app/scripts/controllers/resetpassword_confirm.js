'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:PasswordresetConfirmCtrl
 * @description
 * # PasswordresetConfirmCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('ResetPasswordConfirmCtrl', function ($state, $scope, $stateParams, Auth, Validate) {
    $scope.model = {'new_password1':'','new_password2':''};
    $scope.complete = false;
    $scope.loading = false;
    $scope.confirmReset = function(formData){
        $scope.errors = [];
        Validate.form_validation(formData,$scope.errors);
        if(!formData.$invalid){
            var data = {
                'uid':$stateParams.firstToken,
                'token':$stateParams.passwordResetToken,
                'new_password1':$scope.model.new_password1,
                'new_password2':$scope.model.new_password2
            };
            Auth.$resetPasswordConfirm(data)
            .then(function(data){
                // success case
                $scope.loading = false;
                $scope.complete = true;
            })
            .catch(function(errors){
                // error case
                $scope.loading = false;
                $scope.errors = errors.data;
            });
        }
    };

    $scope.gotoUserProfile = function(){
        $state.go('login');
    };

    $scope.gotoResetPassword = function(){
        $state.go('resetpassword');
    };
});