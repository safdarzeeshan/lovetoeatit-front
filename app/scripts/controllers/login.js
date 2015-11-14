'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('LoginCtrl', function ($scope, $window, $http) {

    var setupHelloJs,
        loginUserSession,
        init;

    setupHelloJs = function() {
        $window.hello.init({
            instagram: '7ad6176b495a4a91aa4567c730957e37'
        },
        {
            //for local dev
            redirect_uri: 'http://lovetoeat.it:9000/',

            //for heroku app
             // redirect_uri:'https://enigmatic-coast-1293.herokuapp.com/',
            response_type: 'code',
            handle_response_manually: true
        });

    };

    // login with instagram
    $scope.login = function() {
        $window.hello('instagram').login().then(function(auth) {
            console.log('logining');
            loginUserSession('instagram', auth.authResponse.code);
        }, function(error) {
            console.log(error);
            $window.alert('Signin error: ' + error);
        });

    };

    loginUserSession = function(network, oauth_code){
        console.log('trying to login');
        $http({
            method: 'POST',
            url: 'http://mykloudkitchen.com:8000/api/login/social/session/',
            data: {provider: network, code: oauth_code},
        }).then(function( data ) {
            console.log(data);

        }), function(error){
            console.log('error' + error);
        };
    };

    init = function() {
        setupHelloJs();
    };

    init();

});