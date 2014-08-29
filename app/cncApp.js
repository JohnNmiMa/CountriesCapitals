angular.module('cncApp', ['cncAppViews', 'ngRoute'])

.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
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
