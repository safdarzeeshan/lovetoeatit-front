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
    'ngCookies', 'ui.router', 'csrf-cross-domain'
]).factory('Test', function () {

    var testFactory = {};
    testFactory.getValue = function () {
        return 'wow';
    };
    return testFactory;
}).factory('Hello', function () {
    return {
        getData: function () {
            return 'this works';
        }
    };
}).factory('responseIntercepter', function ($q) {
    return {
        response: function (response) {
            // do something on success
            console.log('response.headers', response.headers());
            if (response.headers()['content-type'] === "application/json; charset=utf-8") {
            }
            return response;
        },
        responseError: function (response) {
            // do something on error
            return $q.reject(response);
        }
    };
}).config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    // $httpProvider.defaults.headers.post["x-csrftoken"] = 'TEST';
    //delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // console.log($cookies.csrftoken);
    $httpProvider.interceptors.push('responseIntercepter');
    $httpProvider.interceptors.push(function ($cookies) {
        return {
            'request': function (config) {
                if ($cookies.get('csrftoken')) {
                    config.headers['X-CSRFToken'] = $cookies.get('csrftoken');
                }
                return config;
            }
        };
    });

    $urlRouterProvider.otherwise('/login');
    $locationProvider.html5Mode(true).hashPrefix('!');

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
        .state('about', {});

}).config(function (csrfCDProvider) {

    // Django default name
    csrfCDProvider.setHeaderName('X-CSRFToken');
    csrfCDProvider.setCookieName('CSRFToken');


}).run(function ($http, $cookies, $rootScope, $location, Auth) {
    $http.defaults.headers.post["x-csrftoken"] = $cookies.csrftoken;
    $http.get('http://rfq.lan.uz:8000/api/csrftoken').success(function (data, status, headers) {
        $http.defaults.headers.post["x-csrftoken"] = data['csrftoken'];
        $cookies.put('x-csrftoken', data['csrftoken']);
    }, function () {
        console.log('FAILED', $cookies);
        console.log(arguments);
    });


});

