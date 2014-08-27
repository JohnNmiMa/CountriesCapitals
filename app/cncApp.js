angular.module('cncApp', ['cncAppViews', 'ngRoute'])

.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({
      redirectTo : '/'
    });
}])

.controller('CncCtrl', ['$scope', 
                function($scope) {
    $scope.displayInfo = function() {
        console.log("Display Info");
        $('.infoModal').modal({});
    }
}]);
