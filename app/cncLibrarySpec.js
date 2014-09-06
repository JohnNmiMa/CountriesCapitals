describe("cncCountries", function() {
    beforeEach(angular.mock.module('cncLibrary'));

    var data = {
        geonames :  [
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
            { countryName : "India",
                countryCode : "IN" },
            { countryName : "United Kingdom",
                countryCode : "GB",
                population : 62348000,
                areaInSqKm : 244820,
                continent : "EU",
                continentName : "Europe",
                capital : "London" }
        ]
    };

    it('should return a list of countries', inject(function(cncCountries, $rootScope, $httpBackend, GEONAMES_API_PREFIX) {
        var status = false,
            path=GEONAMES_API_PREFIX + "/countryInfoJSON?username=jettagozoom";

            $httpBackend.expect('GET', path).respond(data, 200);
            cncCountries().then(function(countries) {
                // Test for duplicates: 4 countries came back in AJAX call, one duplicate should be found
                expect(countries.length).toBe(3);
                status = true;
            });
            $rootScope.$digest();
            $httpBackend.flush();
            expect(status).toBe(true);
            $httpBackend.verifyNoOutstandingRequest();
    }));
});

