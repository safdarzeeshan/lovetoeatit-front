// 'use strict';

/**
 * @ngdoc overview
 * @name loveToEatItFrontEndApp
 * @description
 * # loveToEatItFrontEndApp
 *
 * Main module of the application.
 */
var loveToEatItFrontEndApp = angular.module('loveToEatItFrontEndApp', [
    'ngCookies', 'ui.router',
]);

loveToEatItFrontEndApp.factory('Test', function() {

    var testFactory = {};
    testFactory.getValue = function(){
        return 'wow';
    };
    return testFactory;
});

loveToEatItFrontEndApp.factory('Hello', function () {
    return {
        getData: function () {
            return 'this works';
        }
    };
});

loveToEatItFrontEndApp.run(function($http, $cookies, $rootScope, $location, Auth){

    $http.get('http://localhost:8000/api/csrftoken')
        .then(function(response) {
            console.log($cookies.get('csrftoken'));
            // $http.defaults.headers.post["x-csrftoken"] = $cookies.csrftoken;
        });


});


loveToEatItFrontEndApp.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $httpProvider.defaults.headers.post["x-csrftoken"] = 'TEST';

    // console.log($cookies.csrftoken);
    // $httpProvider.interceptors.push(function($cookies) {
    //     return {
    //         'request': function(config) {
    //             console.log( 'config: ', config.headers );
    //             config.headers['X-CSRFToken'] = $cookies.csrftoken;
    //             return config;
    //         }
    //     };
    // });

    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode( true ).hashPrefix( '!' );

    $stateProvider


        // HOME STATES AND NESTED VIEWS ========================================

        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            requireLogin: false

        })

        .state('user', {
            url: '/user?code',
            controller: 'AuthCtrl',
            requireLogin: false

        })

        .state('likes', {
            url: '/likes',
            templateUrl: 'views/likes.html',
            controller: 'LikesCtrl',
            requireLogin: true

        })

        .state('recipe', {
            url: '/recipe?id',
            templateUrl: 'views/recipe.html',
            controller: 'RecipeCtrl',
            requireLogin: true

        })

        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
        });

});