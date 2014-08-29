viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/countries/:country/capital", {
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

viewsModule.controller('CountryCtrl', ['$scope', '$q', 'country', 'cncCapital', 'cncCountryNeighbors', 'cncTimezone', 'SQKM_TO_SQMI',
                               function($scope,   $q,   country,   cncCapital,   cncCountryNeighbors,   cncTimezone,   SQKM_TO_SQMI) {

    $scope.numNeighbors = [];
    $scope.countrycode = country.countryCode;
    $scope.country = country.countryName;
    $scope.population = Number(country.population);
    $scope.area = Number(country.areaInSqKm) * SQKM_TO_SQMI;
    $scope.countrycode = country.countryCode;
    $scope.continent= country.continentName;
    $scope.timezone = "?";
    cncCapital(country).then(function(capital) {
        if (capital == undefined) {
            $scope.capital = "N/A";
            $scope.capitalPopulation = 0;
        } else {
            $scope.capital = country.capital;
            $scope.capitalPopulation = capital.population;
            cncTimezone(capital).then(function(timezone) {
                var utc = new Date(timezone.time).valueOf();
                $scope.timezone = timezone.gmtOffset;
                $scope.time = utc;
            });
        }
    })
    .then(cncCountryNeighbors(country.geonameId).then(function(neighbors) {
        if (neighbors == undefined) {
            $scope.numNeighbors = 0;
        } else {
            $scope.numNeighbors = neighbors.length;
            $scope.neighbors = neighbors;
        }
    }));
}]);
