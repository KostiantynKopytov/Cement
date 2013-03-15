define(['module!core', 'jquery', 'extensions'], function (module, $, ext) {
    module.controller('AppController', ["$scope", "$location", "coreService", "locationService", function ($scope, $location, coreService, locationService) {

        $scope.$on("$locationChangeSuccess", function () {
            var path = locationService.path();
            if (path === '' || path === '/') {
                locationService.path('/home');
            } else {
                coreService.getPage(path).success(function(page) {
                    $scope.$root.page = page;
                }).error(function() {
                    // TODO: handle this
                });
            }
        });

        $scope.$on('ctSave', function() {
            var json = angular.toJson($scope.$root.page);
            console.log(json);
            var path = locationService.path();
            coreService.putPage(path, json).error(function () {
                // TODO: handle this
            });
        });
    }]);
});