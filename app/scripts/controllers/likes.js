'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:MainCtrl
 * @description
 * # LikesCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
.controller('LikesCtrl',
    function ($scope, $window, $state,  User, $http, $cookies) {

        //get likes and populate scope
        User.$getLikes()
        .then(function( response ) {
            $scope.likes = response.data;
        });

        $scope.getRecipe = function(id){
            $state.go('user.recipe' , { 'id': id});
        };

        // $scope.postSomething = function(){
        //     console.log('sending',$cookies.get('csrftoken'));
        //     $http.defaults.headers.post['X-CSRFToken'] = $cookies.get('csrftoken');
        //     $http.defaults.headers.put['X-CSRFToken'] = $cookies.get('csrftoken');
        //     $http.post("http://localhost:8000/testt/", {'test':'it'}).success(function(){
        //         console.log('DONE', $cookies);
        //         console.log(arguments);
        //     }, function(){
        //         console.log('FAILED', $cookies);
        //         console.log(arguments);
        //     })
        // };

        // $scope.get_cookies = function(){
        //     return $cookies
        // };

    }
);