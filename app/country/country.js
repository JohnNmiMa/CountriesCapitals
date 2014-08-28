viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/countries/:countryCode", {
        templateUrl : "./country/country.html",
        controller : 'CountryCtrl',
        resolve : {
            country : ['cncCountry', '$route', function(cncCountry, $route) {
                var countryCode = $route.current.params.countryCode;
                return cncCountry(countryCode);
            }]
        }
    });
}]);

viewsModule.controller('CountryCtrl', ['$scope', 'country', 'cncCapital', 'cncCountryNeighbors',
                               function($scope,   country,   cncCapital,   cncCountryNeighbors) {
    //var countryCapital = {};
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
    if (country.capital == "") {
            $scope.capitalPopulation = 0;
    } else {
        cncCapital(country).then(function(capital) {
            if (capital == undefined) {
                $scope.capitalPopulation = 0;
            } else {
                $scope.capitalPopulation = capital.population;
            }
        });
    }
    cncCountryNeighbors(country.geonameId).then(function(neighbors) {
        $scope.neighbors = neighbors;
    });
}]);
