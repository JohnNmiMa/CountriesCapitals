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

viewsModule.controller('CountryCtrl', ['$scope', '$q', 'country', 'cncCapital', 'cncCountryNeighbors',
                               function($scope,   $q,   country,   cncCapital,   cncCountryNeighbors) {

    cncCapital(country).then(function(capital) {
        if (capital == undefined) {
            $scope.capitalPopulation = 0;
        } else {
            $scope.capitalPopulation = capital.population;
        }
    }).then(cncCountryNeighbors(country.geonameId)
    .then(function(neighbors) {
        $scope.neighbors = neighbors;
        $scope.country = country.countryName;
        $scope.population = Number(country.population);
        $scope.area = Number(country.areaInSqKm) * 0.386102;
        if (country.capital == "") {
            $scope.capital = "N/A";
        } else {
            $scope.capital = country.capital;
        }
        $scope.countrycode = country.countryCode;
        $scope.continent= country.continentName;
    }));
}]);
