viewsModule.controller('CountryCtrl', ['$scope', 'capitalData', 'SQKM_TO_SQMI',
                               function($scope,   capitalData,   SQKM_TO_SQMI) {

    $scope.numNeighbors = "?";
    $scope.countrycode = capitalData.country.countryCode;
    $scope.country = capitalData.country.countryName;
    $scope.population = Number(capitalData.country.population);
    $scope.area = Number(capitalData.country.areaInSqKm) * SQKM_TO_SQMI;
    $scope.countrycode = capitalData.country.countryCode;
    $scope.continent= capitalData.country.continentName;

    if (capitalData.country.capital == "") {
        $scope.capital = "N/A";
        $scope.capitalPopulation = 0;
    } else {
        $scope.capital = capitalData.country.capital;
        $scope.capitalPopulation = capitalData.capital.population;
    }

    if (capitalData.timezone == undefined) {
        $scope.timezone = "?";
    } else {
        $scope.time = capitalData.timezone.time.replace(/ /g, 'T');
        $scope.timezone = capitalData.timezone.gmtOffset;
    }

    if (capitalData.neighbors == undefined) {
        $scope.numNeighbors = 0;
    } else {
        $scope.numNeighbors = capitalData.neighbors.length;
        $scope.neighbors = capitalData.neighbors;
    }

}]);

