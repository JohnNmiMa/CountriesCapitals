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

viewsModule.controller('CountryCtrl', ['$scope', 'country', 'cncCapital',
                               function($scope,   country,   cncCapital) {
    //var countryCapital = {};
    $scope.country = country.countryName;
    $scope.population = Number(country.population);
    $scope.area = Number(country.areaInSqKm) * 0.386102;
    $scope.capital = country.capital;
    $scope.countrycode = country.countryCode;
    $scope.continentcode = country.continent;
    cncCapital(country).then(function(capital) {
        $scope.capitalPopulation = capital.population;
    });
}]);
