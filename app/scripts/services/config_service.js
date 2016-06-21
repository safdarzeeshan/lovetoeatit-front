'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Config', function() {

    var config = {};

    //csrf token - local
    config.$csrfDomain = '.lovetoeat.test';

    //csrf token - prod
    // config.$csrfDomain = '.lovetoeat.it';

    //local - Backend
    config.$baseUrl = 'http://api.lovetoeat.test:8000';

    //AWS - Backend
    // config.$baseUrl =  'http://api.lovetoeat.it';

    //Local - Recipe Scraper
    // config.$recipeScraperUrl = 'http://localhost:4567/';

    //AWS - Recipe Scraper
    config.$recipeScraperUrl = 'http://recipescraper.lovetoeat.it';

    //local - Redirect
    config.$redirectUrl = 'http://app.lovetoeat.test:9000';

    // AWS - Redirect
    // config.$redirectUrl = 'http://app.lovetoeat.it';

    return config;
});