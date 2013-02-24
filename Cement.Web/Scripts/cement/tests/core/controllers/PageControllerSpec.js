define(['angular', 'angular-mocks', 'cement/core/controllers/PageController'], function (angular, mock, ctrlFactory) {
    return describe('PageController', function () {
        var scope;

        var depends = [];
        var module = angular.module('test', depends);
        ctrlFactory(module, depends);

        beforeEach(mock.module('test'));

        beforeEach(mock.inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('PageController', { $scope: scope });
        }));

        it("should have placeholder", function () {
            expect(scope.placeholder).toBeDefined();
        });
        
        it("should have a good mood", function () {
            expect(scope.goodMood).toBe(null);
        });
    });
});