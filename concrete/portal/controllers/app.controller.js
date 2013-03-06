define(['module!portal', 'jquery', 'extensions'], function(module, $, ext) {
    module.controller('AppController', ["$scope", "$location", "coreService", function($scope, $location, coreService) {
        $scope.$on("$locationChangeSuccess", function () {
            var path = $location.path();
            if (path === '/') {
                $location.path('/home');
            } else {
                coreService.getPage(path).success(function (data) {
                    $.extend($scope, data);
                }).error(function () {
                    // TODO: handle this
                });
            }
        });

        $scope.save = function () {
            $scope.$root.$broadcast('ctSave');
            console.log('scope: ', $scope);
            console.log('clone: ', ext.cleanClone($scope));
            var json = angular.toJson(ext.cleanClone($scope));
            console.log('saving', json);
            coreService.putPage($location.path(), json).error(function () {
                // TODO: handle this
            });
        };
    }]);
});