define(['_', 'angular-resource'], function (_) {
    return function (module) {
        module.requires = _.union(module.requires, ['ngResource']);
        module.controller('PageController', ["$scope", "$location", "$resource", "$rootScope", function ($scope, $location, $resource, $rootScope) {

            $scope.changeTitle = function () {
                $scope.page.placeholders.left[0].settings.title += "vasya";
            };

            $scope.moveModule = function(source, destination) {
                var widget = source.splice(0, 1);
                if (widget.length > 0) {
                    destination.push(widget[0]);
                }
            };

            var pageService = $resource('/core/~page' + $location.$$path);
            pageService.get({}, function (x) {
                $scope.page = x;
                $scope.page.title = $location.$$path;
                $scope.page.layout = "/core/~layout/" + x.layout;
                $rootScope.title = $scope.page.title;
            });
        }]);
    };
});