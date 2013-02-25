define(['_', 'angular-resource'], function (_) {
    return function (module) {
        module.requires = _.union(module.requires, ['ngResource']);
        console.log(module.requires);
        module.controller('PageController', ["$scope", "$location", "$resource", "$rootScope", function ($scope, $location, $resource, $rootScope) {

            $scope.changeTitle = function () {
                $scope.page.placeholder2.settings.title += "vasya";
            };

            $scope.navClass = function (page) {
                var currentRoute = $location.path().substring(1) || 'home';
                return page === currentRoute.toLowerCase() ? 'active' : '';
            };

            var pageService = $resource('/core/~page' + $location.$$path);
            console.log('loading page:', pageService, $location.$$path);
            pageService.get({}, function (x) {
                console.log('loaded page:', x, $scope);
                $scope.page = x;
                $scope.page.title = $location.$$path;
                $scope.page.layout = "/core/~layout/" + x.layout;
                $rootScope.title = $scope.page.title;
            });
        }]);
    };
});