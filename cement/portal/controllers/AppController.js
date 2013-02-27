define(['module!core'], function(module) {
    module.controller('AppController', ["$scope", "$location", "coreService", function ($scope, $location, coreService) {
        $scope.$on("$locationChangeStart", function () {
            coreService.get({ type: 'page', path: $location.path() }, function (page) {
                $scope.layoutUrl = "/$layout/" + page.layout;
                $scope.page = page;
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