viewsModule.config(['$routeProvider', function($routeProvider) {
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
        templateUrl : "./capital/capital.html",
        controller : 'CapitalCtrl',
        resolve : {
            capitalData : ['$route', '$q', 'cncCountry', 'cncCapital', 'cncTimezone', 'cncCountryNeighbors',
                   function($route,   $q,   cncCountry,   cncCapital,   cncTimezone,   cncCountryNeighbors) {

                var defer = $q.defer(),
                    countryCode = $route.current.params.country,
                    data = {};

                cncCountry(countryCode)
                .then(function(country) {
                    data.country = country;
                    return cncCapital(country);
                })
                .then(function(capital) {
                    data.capital = capital;
                    return cncTimezone(capital);
                }).then(function(timezone) {
                    data.timezone = timezone;
                    return data.country;
                }).then(function(country) {
                    cncCountryNeighbors(country.geonameId).then(function(neighbors) {
                        data.neighbors = neighbors;
                        defer.resolve(data);
                    });
                });
                return defer.promise;
            }]
        }
    });
}]);

