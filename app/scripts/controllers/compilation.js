'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:CompilationCtrl
 * @description
 * # CompilationCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('CompilationCtrl', function ($scope, $window, FoodBlogger, $stateParams, $state, Recipe, $rootScope, _, hotkeys) {

    var compilationName = $stateParams.name;
    $scope.recipeCompPosition= 0;
    $scope.direction = 'left';
    $scope._ = _;
    $scope.compilationRecipes = false;
    $scope.loading= true;
    $scope.compilationEnd = false;

    amplitude.logEvent('Recipe Compilation', {'name':compilationName});
    $rootScope.title = $stateParams.name;

    $scope.showCompilationRecipes = function(){
        amplitude.logEvent('Clicked Begin');
        $scope.compilationRecipes = true;
    }

    Recipe.$getCompilation(compilationName)
    .then(function( response ) {
        $scope.loading= false;
        $scope.compilation = response.data;
        $rootScope.shareImage = response.data.share_image_url;
        $rootScope.shareDescription = response.data.description;

    });

    $scope.slickConfig = {
        dots: false,
        autoplay: false,
        initialSlide: 0,
        infinite: false,
        autoplaySpeed: 1000,
        arrows: false,
        slidesToShow: 1,
        accessibility: false,
        method: {},
        event: {
            beforeChange: function (event, slick, currentSlide, nextSlide) {

            },
            afterChange: function (event, slick, currentSlide, nextSlide) {
                $scope.recipeCompPosition = currentSlide;
            },
            breakpoint: function (event, slick, breakpoint) {

            },
            destroy: function (event, slick) {

            },
            edge: function (event, slick, direction) {
                if (direction === 'left'){
                    $scope.compilationEnd = true;
                }
            },
            reInit: function (event, slick) {

            },
            init: function (event, slick) {
                console.log('init');
            },
            setPosition: function (evnet, slick) {

            },
            swipe: function (event, slick, direction) {

            }
        }
    };

    $scope.nextRecipeComp = function () {
        amplitude.logEvent('next recipe in compilation');

        //recipeCompPostion is index and recipes.length is actual length
        if ($scope.recipeCompPosition === ($scope.compilation.recipes.length)){
            //do nothing
        }
        else{
            $scope.slickConfig.method.slickNext();
        }

    };

    $scope.prevRecipeComp = function () {
        amplitude.logEvent('previous recipe in compilation');

        if ($scope.recipeCompPosition === 0){
            //do nothing
        }
        else{
            $scope.slickConfig.method.slickPrev();
        }

    };

    hotkeys.add({
        combo: 'right',
        description: 'Next Recipe',
        callback: function() {
            if($scope.compilationRecipes !== false){
                $scope.nextRecipeComp();
            }
        }
    });

    hotkeys.add({
        combo: 'left',
        description: 'Previous Recipe',
        callback: function() {
            if($scope.compilationRecipes !== false){
                $scope.prevRecipeComp();
            }
        }
    });

    $scope.gotoRecipe = function(recipe_url) {
        $window.open(recipe_url);
        amplitude.logEvent('Recipe blog link clicked');
    };

    FoodBlogger.$getCategoryTagsList()
    .then(function(response){
        $scope.categoryTags=response.data;
    })
    .catch(function(error){
        console.log(error);
    });

    $scope.gotoCategoryTagRecipes = function(name){
        $state.go($scope.userStatus + '.tagrecipes' , { 'tag': 'category_tag', 'name': name});
    };

  })
