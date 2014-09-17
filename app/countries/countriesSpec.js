describe("cncAppViews", function() {
    beforeEach(angular.mock.module('cncAppViews'));
    describe('CountriesCtrl', function() {
        var ctrl, scope,
            countries =  [
                { countryName : "United States",
                    countryCode : "US",
                    population : 310232000,
                    areaInSqKm : 9629091,
                    continent : "NA",
                    continentName : "North America",
                    capital : "Washington" },
                { countryName : "India",
                    countryCode : "IN",
                    population : 1173108000,
                    areaInSqKm : 3287590,
                    continent : "AS",
                    continentName : "Asia",
                    capital : "New Delhi" },
                { countryName : "United Kingdom",
                    countryCode : "GB",
                    population : 62348000,
                    areaInSqKm : 244820,
                    continent : "EU",
                    continentName : "Europe",
                    capital : "London" }
            ],
            country = "GB"; // set to URL /country/GB

        // Create a CountriesCtrl controller, and mock out the
        // 'countries', 'country' parameters.
        beforeEach(inject(function($controller, $rootScope, SQKM_TO_SQMI) {
            scope = $rootScope.$new();
            ctrl = $controller('CountriesCtrl', {
                $scope : scope,
                countries : countries,
                country : country,
//                SQKM_TO_SQMI : 0.386102
                SQKM_TO_SQMI : SQKM_TO_SQMI
            });
        }));

        it('should update the countries view showing United Kingdom', function() {
//            console.log("First it: country = " + country);
            expect(scope.country).toBe("United Kingdom");
            expect(scope.maxPopulation).toBe(1173108000);
            expect(Math.round(scope.maxArea)).toBe(3717811);
            expect(scope.country).toBe("United Kingdom");
            expect(scope.countrycode).toBe("GB");
            expect(scope.continentcode).toBe("EU");
            expect(scope.capital).toBe("London");
            expect(scope.population).toBe(62348000);
            expect(Math.round(scope.area)).toBe(94525);
            expect(scope.showCountryInfo).toBe(true);
            expect(scope.showCountryList).toBe(false);
        });

        // Don't mock this out - need to change 'country' for next test
        it('should update an empty countries view', function() {
            country = "ALL"; // set to URL /country/ALL
        });

        it('should update an empty countries view', function() {
            expect(scope.countrycode).toBe("ALL");
            expect(scope.showCountryInfo).toBe(false);
            expect(scope.showCountryList).toBe(true);
        });

        it('should display India', function() {
            scope.displayCountry(1);
//            console.log("Third it: country = " + scope.country);
            expect(scope.country).toBe("India");
            expect(scope.countrycode).toBe("IN");
            expect(scope.population).toBe(1173108000);
            expect(Math.round(scope.area)).toBe(1269345);
            expect(scope.capital).toBe("New Delhi");
            expect(scope.continentcode).toBe("AS");
            expect(scope.showCountryInfo).toBe(true);
            expect(scope.showCountryList).toBe(false);
        });

    });
});
