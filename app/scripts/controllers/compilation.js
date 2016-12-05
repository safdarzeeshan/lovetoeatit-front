'use strict';

/**
 * @ngdoc function
 * @name loveToEatItFrontEndApp.controller:CompilationCtrl
 * @description
 * # CompilationCtrl
 * Controller of the loveToEatItFrontEndApp
 */
angular.module('loveToEatItFrontEndApp')
  .controller('CompilationCtrl', function ($scope, $window, $stateParams, $state, Recipe, $rootScope, _) {

    var compilationName = $stateParams.name;
    $scope.recipeCompPosition= 0;
    $scope.direction = 'left';
    $scope._ = _;
    $scope.compilationRecipes = false;
    $scope.loading= true;
    $scope.compilationEnd = false;

    amplitude.logEvent('Recipe Compilation', {'name':compilationName});
    $rootScope.title = $stateParams.name;

    Recipe.$getCompilation(compilationName)
    .then(function( response ) {
        $scope.loading= false;
        $scope.compilation = response.data;
        $rootScope.shareImage = response.data.image_url;
    });

    $scope.showCompilationRecipes = function(){
        amplitude.logEvent('Clicked Begin');
        $scope.compilationRecipes = true;
    }

    $scope.setRecipeCompPosition = function(index){s
        $scope.recipeCompPosition = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.recipeCompPosition === index;
    };

    $scope.nextRecipeComp = function () {
        amplitude.logEvent('next recipe in compilation');
        $scope.direction = 'left';

        if ($scope.recipeCompPosition === ($scope.compilation.recipes.length - 1)){
            $scope.compilationEnd = true;
        }

        else{
            $scope.recipeCompPosition = ($scope.recipeCompPosition < $scope.compilation.recipes.length - 1) ? ++$scope.recipeCompPosition : 0;
        }
    };

    $scope.prevRecipeComp = function () {
        amplitude.logEvent('previous recipe in compilation');
        $scope.direction = 'right';

        if ($scope.recipeCompPosition === 0){
            //do nothing
        }
        else if($scope.compilationEnd === true){
            $scope.compilationEnd = false;
            $scope.recipeCompPosition = $scope.compilation.recipes.length - 1;
        }
        else{
            $scope.recipeCompPosition = ($scope.recipeCompPosition > 0) ? --$scope.recipeCompPosition : $scope.compilation.recipes.length - 1;
        }
    };

    $scope.gotoRecipe = function(recipe_url) {
        $window.open(recipe_url);
        amplitude.logEvent('Recipe blog link clicked');
    };

  })

  .animation('.slide-animation', function () {
        return {
            addClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');
                    var startPoint = element.parent().width();

                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }
                    TweenMax.set(element, { left: startPoint });
                    TweenMax.to(element, 0.5, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });
