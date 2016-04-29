'use strict';

angular.module('loveToEatItFrontEndApp')
.factory('Config', function() {

    var config = {};

    //local - Backend
    config.$baseUrl = 'http://mykloudkitchen.com:8000';

    //AWS - Backend
    // config.$baseUrl = 'http://api.lovetoeat.it';

    //Local - Recipe Scraper
    // config.$recipeScraperUrl = 'http://localhost:9292';

    //AWS - Recipe Scraper
    config.$recipeScraperUrl = 'http://recipescraper.lovetoeat.it';

    //local - Redirect
    // config.$redirectUrl = 'http://lovetoeat.it:9000';

    //AWS - Redirect
    config.$redirectUrl = 'http://app.lovetoeat.it';

    return config;
});