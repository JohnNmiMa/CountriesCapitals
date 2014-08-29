viewsModule.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when("/countries", {
        templateUrl : "./countries/countries.html",
        controller : 'CountriesCtrl',
        resolve : {
            countries : ['cncCountries', function(cncCountries) {
                return cncCountries();
            }]
        }
    });
}]);

viewsModule.controller('CountriesCtrl', ['$scope', 'countries', 'SQKM_TO_SQMI',
                                 function($scope,   countries,   SQKM_TO_SQMI) {
    var area = population = usIndex = 0;

    $scope.countries = countries;
    $scope.maxPopulation = 0;
    $scope.maxArea = 0;

    for (index in countries) {
        population = Number(countries[index].population);
        area = Number(countries[index].areaInSqKm);

        if ($scope.maxPopulation < population) {
            $scope.maxPopulation =  population;
        }
        if ($scope.maxArea < area) {
            $scope.maxArea = area;
        }
        if (countries[index].countryCode == "US") {
            usIndex = index;
        }
    }
    $scope.maxArea = $scope.maxArea * SQKM_TO_SQMI; // Convert to Sq Mi

    $scope.displayCountry = function(index) {
        setCountry(index);
    }

    function setCountry(index) {
        var width = Number($(".infograph .populationContainer").width());
        $(".infograph .populationContainer").height(width);
        $(".infograph .areaContainer").height(width);

        $scope.country = countries[index].countryName;
        $scope.population = Number(countries[index].population);
        $scope.area = Number(countries[index].areaInSqKm) * SQKM_TO_SQMI;
        $scope.capital = countries[index].capital;
        $scope.countrycode = countries[index].countryCode;
        $scope.continentcode = countries[index].continent;
    }

    $scope.computeLayout = function(size, maxSize) {
        var ratio = ((size/maxSize) < 0.01) ? 0.01 : size/maxSize,
            widthPct = ratio * 100,
            widthPctT = widthPct.toString() + "%",
            offsetPctT = ((100 - widthPct)/2).toString() + "%";
        return {'width':widthPctT, 'height':widthPctT, 'border-radius':'50%', 'left':offsetPctT, 'top':offsetPctT};
    }

    setCountry(usIndex);
}]);
