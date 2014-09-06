xdescribe("cncAppViews", function() {
    beforeEach(angular.mock.module('cncAppViews'));
    describe('CapitalCtrl', function() {
        var ctrl, scope;
        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            ctrl = $controller('CapitalCtrl', {
                $scope : scope,
                capitalData : {
                        country: {
                            countryName : "United States",
                            countryCode : "US",
                            population : 310232000,
                            areaInSqKm : 9629091,
                            continentName : "North America",
                            capital : "Washington"
                        },
                        capital: {
                            population : 601000
                        },
                        timezone: {
                            time : "2014-09-05 17:34",
                            gmtOffset : -6
                        },
                        neighbors: ["CA", "CU", "MX"]
                },
                SQKM_TO_SQMI : 0.386102
            });
        }));

        it('should update the capital view', function() {
            expect(scope.country).toBe("United States");
            expect(scope.countrycode).toBe("US");
            expect(scope.population).toBe(310232000);
            expect(Math.round(scope.area)).toBe(3717811);
            expect(scope.continent).toBe("North America");
            expect(scope.capital).toBe("Washington");
            expect(scope.capitalPopulation).toBe(601000);
            expect(scope.time).toBe("2014-09-05T17:34");
            expect(scope.timezone).toBe(-6);
            expect(scope.numNeighbors).toBe(3);
        });
    });
});
