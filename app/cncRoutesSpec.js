describe('cncAppViews', function() {
    beforeEach(angular.mock.module('cncAppViews'));

    it('should map /countries route to /countries/ALL', inject(function($route) {
        expect($route.routes['/countries'].redirectTo()).toBe('/countries/ALL');
    }));

    it('should map /countries/:country route to its controller', inject(function($route) {
        expect($route.routes['/countries/:country'].controller).toBe('CountriesCtrl');
        expect($route.routes['/countries/:country'].templateUrl).toEqual('./countries/countries.html');
    }));

    it('should map /countries/:country/capital route to its controller', inject(function($route) {
        expect($route.routes['/countries/:country/capital'].controller).toBe('CapitalCtrl');
        expect($route.routes['/countries/:country/capital'].templateUrl).toEqual('./capital/capital.html');
    }));
});

describe('cncApp', function() {
    beforeEach(angular.mock.module('cncApp'));

    it('should map /unexpected route to controller /', inject(function($route) {
        expect($route.routes[null].redirectTo).toBe('/');
    }));
});
