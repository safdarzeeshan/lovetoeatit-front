'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('UserCtrl',
    function ($scope, $window, $stateParams, $localStorage, $location, Likes, $state, Auth, $http, $cookies, $element, $rootScope) {

    var role,
        setupProfile;

    $scope.showMobileMenu = false;
    $scope.userStatus= 'guest';
    $rootScope.shareUrl = $location.absUrl();

    if(Auth.$isLoggedIn())
    {
        $scope.userStatus= 'user';
    }

    //check role
    role = function(){

        if (Auth.$userRole() === 'FoodBlogger'){
            $scope.FoodBlogger = true;
        }

        if (Auth.$userRole() === 'Admin'){
            $scope.Admin = true;
        }
    };

    setupProfile = function(){

        Auth.$getUser()
        .success(function(response){
            //populate profile picture and username
            $scope.user = response;
            //make sure user gets updated with new role
            $localStorage.role = response.role;
            amplitude.setUserId(response.email);

        }).catch(function(error){
            console.log(error)

            //Delete all cookies & local storage and take the user to login page
            $localStorage.$reset();
            delete $http.defaults.headers.common.Authorization;
            delete $cookies.remove('token');
            amplitude.logEvent(error);
            amplitude.clearUserProperties();
            $state.go('login');

        });

    };

    $scope.navClass = function (page) {
        var path = $location.path().split('/')[2];
        var currentRoute = path || 'feed';
        return page === currentRoute ? 'active' : '';
    };

    $scope.logout = function() {

        Auth.$logoutUserLocal()
        .success(function() {
            //clear localstorage
            $localStorage.$reset();
            delete $http.defaults.headers.common.Authorization;
            delete $cookies.remove('token');
            amplitude.logEvent('Clicked Logout');
            amplitude.clearUserProperties();
            $state.go('guest.landingpage_user');

        }).catch(function(error){
            console.log('error' + error);
        });
    };

    $scope.search = function(searchTerm){
        $state.go('user.searchResults' , { 'q': searchTerm});
        //Add search term to amplitude
        var searchProperties = {
            'searchTerm': searchTerm,
        };
        amplitude.logEvent('Clicked search', searchProperties);
    };

    $scope.gotoFeed = function() {
        $state.go('user.feed');
        amplitude.logEvent('Clicked Feed');
    };

    $scope.gotoLikes = function() {
        $state.go('user.likes');
        amplitude.logEvent('Clicked Likes');
    };

    $scope.gotoCollections = function() {
        $state.go('user.collections');
        amplitude.logEvent('Clicked Collections');
    };

    $scope.gotoAllRecipes = function() {
        $state.go('user.allRecipes');
        amplitude.logEvent('Clicked Discover');
    };

    $scope.gotoSubmitRecipe = function() {
        $state.go('user.submitRecipe', { reload: true });
        amplitude.logEvent('Clicked Submit recipe');
    };

    $scope.gotoEditRecipe = function() {
        $state.go('user.editRecipe', { reload: true });
        amplitude.logEvent('Clicked Edit recipe');
    };

    $scope.gotoEditUser = function() {
        $state.go('user.allUsers');
        amplitude.logEvent('Clicked Edit usre');
    };

    $scope.gotoSubmittedRecipes = function() {
        $state.go('user.submittedRecipes');
        amplitude.logEvent('Clicked Submitted recipes');
    }

    $scope.gotoUserProfile = function() {
        $state.go('user.profile');
        amplitude.logEvent('Clicked User Profile');
    };

    $scope.darkenBackground = function(){
      console.log($('#bs-example-navbar-collapse-1').attr('aria-expanded'));
    };

    $scope.getRecipe = function(id){
        $state.go($scope.userStatus + '.recipe' , { 'id': id});
        var recipeProperties = {
            'id': id,
        };
        amplitude.logEvent('Clicked recipe details', recipeProperties);
    };

    role();
    setupProfile();

});