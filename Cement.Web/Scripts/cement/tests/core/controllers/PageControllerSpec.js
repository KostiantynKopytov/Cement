define(['angular-mocks', 'cement/core/controllers'], function (mock) {
    return describe('PageController', function () {
        var scope;

        beforeEach(mock.module('cement.core.controllers'));

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