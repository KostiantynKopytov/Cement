define(['angular-mocks', 'module!core', '../../../core/controllers/PageController'], function (mock, module) {
    return describe('PageController', function() {
        var scope;

        module.factory('$location', function() {
            return { path: function() { return "/"; } };
        });
        module.factory('coreService', function() {
            return {
                get: function(args, callback) {
                    callback({ title: "test", placeholders: {} });
                }
            };
        });

        var cs;

        beforeEach(mock.module('core'));
        beforeEach(mock.inject(function ($rootScope, $controller, coreService) {
            spyOn(coreService, 'get');
            cs = coreService;

            scope = $rootScope.$new();
            $controller('PageController', { $scope: scope });
        }));

        it("page should call service", function () {
            expect(cs.get).toHaveBeenCalled();
        });
    });
});