'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:RegisterCtrl
 * @description
 * # RegisterCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('RegisterCtrl', function ($http, $cookies, $scope, Auth, Validate, $state, $localStorage, ModalService) {
    $scope.newuser = {'username':'','password':''};

    $scope.loading = false;

    $scope.gotoLogin = function(){
        $state.go('login');
    };

    $scope.gotoResetPassword = function(){
        $state.go('resetpassword');
    };

    $scope.register = function(formData){
        $scope.errors = [];
        Validate.form_validation(formData,$scope.errors);
        if(!formData.$invalid){
            $scope.loading = true;
            var data = {
                'password1':$scope.newuser.password1,
                'password2':$scope.newuser.password2,
                'email':$scope.newuser.email
            };

            //update user with name
            var name = {
            'first_name':$scope.newuser.first_name,
            'last_name':$scope.newuser.last_name
            };

            Auth.$register(data)
            .success(function(data){
                // success case
                $http.defaults.headers.common.Authorization = 'Token ' + data.key;
                $cookies.put('token', data.key);
                console.log(data.key);
                $localStorage.role = 'Foodie';
                $localStorage.isAuthenticated = 'true';
                $localStorage.onboarding_status = 'New';

                    Auth.$updateUser(name)
                    .success(function(response){
                        console.log(response);
                        $scope.loading = false;
                        $state.go('onboarding.instagram_connect');

                    }),function(error){
                        console.log('cannot update user information' + error);
                    };

            })
            .catch(function(errors){
                // error case
                $scope.loading = false;
                $scope.errors = errors.data;
            });
        }
    };

    $scope.termsOfUse = function(){
        ModalService.showModal({
            templateUrl: 'views/modal_termsofuse.html',
            controller: "ModalCtrl",
            inputs: {
            message: "These are our terms of use"
        }
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function() {
            });
        });

    };
  });