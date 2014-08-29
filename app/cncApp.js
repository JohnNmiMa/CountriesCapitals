angular.module('cncApp', ['cncAppViews', 'ngRoute'])

.run(function($rootScope, $location, $route, $timeout) {
    $rootScope.$on('$routeChangeStart', function() {
        // Don't do loading animation if going home
        if ($location.$$path != "" && $location.$$path != "/") {
            $rootScope.isLoading = true;
        }
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 1000);
    });
})

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
