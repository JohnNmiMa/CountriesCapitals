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

viewsModule.controller('CountriesCtrl', ['$scope', 'countries',
                                 function($scope,   countries) {
    var maxPopulation = pop = 0,
        maxArea = area = 0;
    $scope.countryNames = [];

    for (country in countries) {
        population = Number(countries[country].population);
        area = Number(countries[country].areaInSqKm);

        if (maxPopulation < population) {
            maxPopulation =  population;
        }
        if (maxArea < area) {
            maxArea = area;
        }

        $scope.countryNames.push(countries[country].countryName);
    }

    $scope.displayCountry = function(index) {
        //console.log("Display " + $scope.countryNames[index]);
        setCountry(index);
    }

    function setCountry(index) {
        var popWidth = Number($(".infograph .populationContainer").width()),
            areaWidth = Number($(".infograph .areaContainer").width()),
            popRadius = areaRadius = 0,
            radiusText = "",
            populationRatio = areaRatio = 1.0;

        // Update data bindings
        $scope.country = countries[index].countryName;
        $scope.population = Number(countries[index].population);
        $scope.area = Number(countries[index].areaInSqKm);
        $scope.capital = countries[index].capital;
        $scope.capitalPopulation = "???";

        // Compute population infographic size
        computePopulationLayout($scope.population, popWidth);
        computeAreaLayout($scope.area, popWidth);

    }

    function computePopulationLayout(countryPopulation, popContainerWidth) {
        var populationRatio = countryPopulation / maxPopulation,
            popWidth = popContainerWidth * populationRatio,
            radiusText = "",
            horzOffset = 0;

        if (popWidth < 2.0) {
            popWidth = 2;
        }
        radiusText = (popWidth/2).toString() + "px";
        $(".infograph .populationContainer").height(popWidth);
        $(".infograph .population").width(popWidth);
        $(".infograph .population").height(popWidth);
        $(".infograph .population").css('border-radius',radiusText);

        horzOffset = (popContainerWidth - popWidth) / 2;
        $(".infograph .population").css('left',horzOffset);
        $(".infograph .population").css('top',horzOffset);
    }

    function computeAreaLayout(countryArea, areaContainerWidth) {
        var areaRatio = countryArea / maxArea,
            areaWidth = areaContainerWidth * areaRatio,
            radiusText = "",
            horzOffset = 0;

        if (areaWidth < 2.0) {
            areaWidth = 2;
        }
        radiusText = (areaWidth/2).toString() + "px";
        $(".infograph .areaContainer").height(areaWidth);
        $(".infograph .area").width(areaWidth);
        $(".infograph .area").height(areaWidth);
        $(".infograph .area").css('border-radius',radiusText);

        horzOffset = (areaContainerWidth - areaWidth) / 2;
        $(".infograph .area").css('left',horzOffset);
        $(".infograph .area").css('top',horzOffset);
    }

    setCountry(0);
}]);
