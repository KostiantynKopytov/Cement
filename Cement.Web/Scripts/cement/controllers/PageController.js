angular.module('Cement.Controllers').controller('PageController', ["$scope", "$location", "$rootScope", function ($scope, $location, $rootScope) {
    $rootScope.title = $location.$$path;

    $scope.placeholder = {
        name: "testmodule",
        settings: {
            title: 'Test Module 1',
            option1: '1',
            option2: '2'
        }
    };
    $scope.placeholder2 = {
        name: "testmodule",
        settings: {
            title: 'Test Module 2',
            option1: '1',
            option2: '2'
        }
    };

    $scope.changeTitle = function () {
        $scope.placeholder2.settings.title += "vasya";
    };

}]);