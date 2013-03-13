define(['module!core', 'jquery', 'extensions'], function(module, $, ext) {

    module.controller('AppController', ["$scope", "$location", "coreService", function($scope, $location, coreService) {

        $scope.$on("$locationChangeSuccess", function() {
            var path = $location.path();
            if (path === '' || path === '/') {
                $location.path('/home');
            } else {
                coreService.getPage(path).success(function(page) {
                    $scope.$root.page = page;
                }).error(function() {
                    // TODO: handle this
                });
            }

            // cleanup css
            var links = $("style[data-usage='0']");
            links.remove();
        });

        $scope.$on('ctSave', function() {
            var json = angular.toJson($scope.$root.page);
            console.log(json);
            coreService.putPage($location.path(), json).error(function() {
                // TODO: handle this
            });
        });
    }]);
});