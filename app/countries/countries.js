viewsModule.controller('CountriesCtrl', ['$scope', 'countries', 'SQKM_TO_SQMI',
                                 function($scope,   countries,   SQKM_TO_SQMI) {
    var area = population = usIndex = 0;

    $scope.$emit('showDropdown', true);

    $scope.showCountries = false;
    $scope.countries = countries;
    $scope.maxPopulation = 0;
    $scope.maxArea = 0;
    $scope.countryInfo = {};

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
        $scope.showCountries = false;
    }

    function setCountry(index) {
        var width = Number($(".infograph .populationContainer").width()),
            mq = window.matchMedia( "(min-width: 767px)" );

        $scope.country = countries[index].countryName;
        $scope.population = Number(countries[index].population);
        $scope.area = Number(countries[index].areaInSqKm) * SQKM_TO_SQMI;
        $scope.capital = countries[index].capital;
        $scope.countrycode = countries[index].countryCode;
        $scope.continentcode = countries[index].continent;
        $scope.countryInfo = countries[index];
    }

    $scope.computeLayout = function(size, maxSize, areaOrPopulation) {
        var width = Number($(".infograph .populationContainer").width()),
            ratio = ((size/maxSize) < 0.02) ? 0.02 : size/maxSize,
            widthPct = ratio * 100,
            widthPctT = widthPct.toString() + "%",
            offsetPctT = ((100 - widthPct)/2).toString() + "%",
            mq = window.matchMedia( "(min-width: 767px)" ); // Bootstrap's xs break

        if(mq.matches) {
            //console.log("Browser window is 767 pixels or more");
            var heightSize = width * ratio;
            if (areaOrPopulation == "area") {
                $(".infograph .areaContainer").height(width);
            } else {
                $(".infograph .populationContainer").height(width);
            }
            return {'width':widthPctT, 'height':widthPctT, 'border-radius':'50%', 'left':offsetPctT, 'top':offsetPctT};
        } else {
            //console.log("Browser window is 767 pixels or less");
            var heightSize = width * ratio;
            if (areaOrPopulation == "area") {
                $(".infograph .areaContainer").height(heightSize);
            } else {
                $(".infograph .populationContainer").height(heightSize);
            }
            return {'width':widthPctT, 'height':'100%', 'border-radius':'50%', 'left':offsetPctT, 'top':0};
        }
    }

    $scope.$on('toggleCountries', function(event) {
        $scope.showCountries = !$scope.showCountries;
    });

    setCountry(usIndex);
}]);
