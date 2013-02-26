define(['module!core'], function(module) {
    module.controller('PageController', ["$scope", "$location", "coreService", "$rootScope", function ($scope, $location, coreService, $rootScope) {
        $scope.changeTitle = function() {
            $scope.page.placeholders.left[0].settings.title += "vasya";
        };

        $scope.moveModule = function(source, destination) {
            var widget = source.splice(0, 1);
            if (widget.length > 0) {
                destination.push(widget[0]);
            }
        };
    }]);
});