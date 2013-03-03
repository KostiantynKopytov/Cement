define(['module!portal', 'jquery'], function(module, $) {
    module.controller('AppController', ["$scope", "$location", "coreService", function($scope, $location, coreService) {
        $scope.$on("$locationChangeSuccess", function () {
            coreService.getPage($location.path()).success(function (page) {
                $scope.page = page;
            }).error(function() {
                // TODO: handle this
            });
        });

        $scope.$on("ctSave", function() {
            var json = angular.toJson($scope.page);
            console.log('saving', json);
            coreService.putPage($location.path(), json).error(function() {
                // TODO: handle this
            });
        });
    }]);
});