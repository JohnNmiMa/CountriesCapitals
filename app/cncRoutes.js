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
        //resolve : {
            //capitalData : ['cncCountries', 'cncTimezone', 'cncCountryNeighbors',
              //function(cncCountries,   cncTimezone,   cncCountryNeighbors) {
                //var data = {};
                //cncCapital(country).then(function(capital) {
                    //data.capital = capital;
                    //if (capital == undefined) {
                        //return undefined;
                    //} else {
                        //return cncTimezone(capital);
                    //}
                //}).then(function(timezone) {
                    //data.timezome = timezone;
                //});

                //cncCountryNeighbors(country.geonameId).then(function(neighbors) {
                    //data.neighbors = neighbors;
                //});
                //return data;
            //}]
        //}
    })
    .when("/countries/:country/capital", {
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

