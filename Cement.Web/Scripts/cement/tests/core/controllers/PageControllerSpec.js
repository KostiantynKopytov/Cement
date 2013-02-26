define(['angular-mocks', '../../../core/controllers/PageController'], function(mock, ctrlFactory) {
    return describe('PageController', function() {
        var scope;

        var module = angular.module('test', []);
        module.factory('$location', function() {
            return {
                path: function() {
                    return "/";
                }
            };
        });
        module.factory('coreService', function() {
            return {
                get: function(args, callback) {
                    callback({ title: "test", placeholders: {} });
                }
            };
        });

        ctrlFactory(module);

        beforeEach(mock.module('test'));

        beforeEach(mock.inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            $controller('PageController', { $scope: scope });
        }));

        it("page should have title 'test'", function() {
            expect(scope.page.title).toBe("test");
        });

        it("page should have placeholders", function() {
            expect(scope.page.placeholders).toBeDefined();
        });
    });
});