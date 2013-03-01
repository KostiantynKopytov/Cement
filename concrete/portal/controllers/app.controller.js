define(['module!portal'], function (module) {
    module.controller('AppController', ["$scope", "$location", "coreService", function ($scope, $location, coreService) {
        $scope.$on("$locationChangeStart", function () {
            coreService.getPage($location.path()).success(function (page) {
                $scope.layoutUrl = "/portal/layouts/" + page.layout + ".html";
                $scope.page = page;
            }).error(function () {
                // TODO: handle this
            });
        });

        $scope.moveWidget = function (source, destination) {
            var widget = source.splice(0, 1);
            if (widget.length > 0) {
                destination.push(widget[0]);
            }
        };
        
        $scope.changeTitle = function () {
            $scope.page.placeholders.left[0].settings.title += " vasya";
        };
    }]);
});