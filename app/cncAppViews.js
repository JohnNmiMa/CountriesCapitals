var viewsModule = angular.module('cncAppViews', ['ngRoute', 'ngAnimate', 'cncLibrary'])

.constant('SQKM_TO_SQMI', 0.386102)

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/", {
        templateUrl : "./home/home.html",
        controller : 'HomeCtrl'
    })
    .when("/countries", {
        templateUrl : "./countries/countries.html",
        controller : 'CountriesCtrl',
        resolve : {
            countries : ['cncCountries', function(cncCountries) {
                return cncCountries();
            }]
        }
    })
    .when("/countries/:country/capital", {
        templateUrl : "./country/country.html",
        controller : 'CountryCtrl',
        resolve : {
            country : ['cncCountry', '$route', function(cncCountry, $route) {
                var countryCode = $route.current.params.country;
                return cncCountry(countryCode);
            }]
        }
    });
}]);

