define(['module!portal', 'jquery'], function(module, $) {
    module.controller('AppController', ["$scope", "$location", "coreService", function($scope, $location, coreService) {
        $scope.$on("$locationChangeSuccess", function () {
            coreService.getPage($location.path()).success(function (data) {
                $.extend($scope, data);
            }).error(function() {
                // TODO: handle this
            });
        });

        $scope.save = function () {
            $scope.$root.$broadcast('ctSave');

            var json = angular.toJson({ page: $scope.page, title: $scope.title });
            console.log('saving', json);
            coreService.putPage($location.path(), json).error(function () {
                // TODO: handle this
            });
        };
    }]);
});