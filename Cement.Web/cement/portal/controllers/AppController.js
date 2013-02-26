define(['module!core'], function(module) {
    module.controller('AppController', ["$scope", "$location", "coreService", function ($scope, $location, coreService) {
        $scope.$on("$locationChangeStart", function () {
            coreService.get({ type: 'page', path: $location.path() }, function (page) {
                console.log('layout loaded', page);
                $scope.layoutUrl = "/core/~layout/" + page.layout;
                $scope.page = page;
            });
        });
    }]);
});