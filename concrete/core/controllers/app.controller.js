define(['module!core', 'jquery', 'extensions'], function (module, $, ext) {

    module.controller('AppController', ["$scope", "$location", "coreService", "locationService", function ($scope, $location, coreService, locationService) {

        $scope.$on("$locationChangeSuccess", function () {
            console.log(locationService.path());
//            if (window.location.pathname != $location.path()) {
//                window.location.href = $location.path();
//            }

            var path = locationService.path();
//            if (path === '' || path === '/') {
//                $location.path('/home');
//            } else {
                coreService.getPage(path).success(function(page) {
                    $scope.$root.page = page;
                }).error(function() {
                    // TODO: handle this
                });
//            }

            // cleanup css
            var links = $("style[data-usage='0']");
            links.remove();
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