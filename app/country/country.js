viewsModule.controller('CountryCtrl', ['$rootScope', '$scope', '$q', 'country', 'cncCapital', 'cncCountryNeighbors', 'cncTimezone', 'SQKM_TO_SQMI', '$timeout',
                               function($rootScope,   $scope,   $q,   country,   cncCapital,   cncCountryNeighbors,   cncTimezone,   SQKM_TO_SQMI, $timeout) {

    var isGettingCapital = isGettingTime = isGettingNeighbors = true;

    $rootScope.isLoading = true;
    $scope.numNeighbors = "?";
    $scope.countrycode = country.countryCode;
    $scope.country = country.countryName;
    $scope.population = Number(country.population);
    $scope.area = Number(country.areaInSqKm) * SQKM_TO_SQMI;
    $scope.countrycode = country.countryCode;
    $scope.continent= country.continentName;

    cncCapital(country).then(function(capital) {
        isGettingCapital = false;
        $rootScope.isLoading = isGettingCapital || isGettingTime || isGettingNeighbors;

        if (capital == undefined) {
            $scope.capital = "N/A";
            $scope.capitalPopulation = 0;
            return undefined;
        } else {
            $scope.capital = country.capital;
            $scope.capitalPopulation = capital.population;
            return cncTimezone(capital);
        }
    }).then(function(timezone) {
        if (timezone == undefined) {
            $scope.timezone = "?";
        } else {
            var utc = new Date(timezone.time).valueOf();
            $scope.timezone = timezone.gmtOffset;
            $scope.time = utc;
        }
        isGettingTime = false;
        $rootScope.isLoading = isGettingCapital || isGettingTime || isGettingNeighbors;
    });

    cncCountryNeighbors(country.geonameId).then(function(neighbors) {
        if (neighbors == undefined) {
            $scope.numNeighbors = 0;
        } else {
            $scope.numNeighbors = neighbors.length;
            $scope.neighbors = neighbors;
        }
        isGettingNeighbors = false;
        $rootScope.isLoading = isGettingCapital || isGettingTime || isGettingNeighbors;
    });
}]);


