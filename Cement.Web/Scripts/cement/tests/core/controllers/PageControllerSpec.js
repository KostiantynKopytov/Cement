define(['angular-mocks', 'cement/core/controllers/PageController'], function (mock, ctrlFactory) {
    return describe('PageController', function () {
        var scope;

        var module = angular.module('test', []);
        ctrlFactory(module);

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