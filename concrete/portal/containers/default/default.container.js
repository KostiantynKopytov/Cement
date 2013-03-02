define(['jquery', 'module!core', 'extensions'], function ($, module) {
    module.directive('ctContainerDefault', [function () {
        return {
            restrict: 'A',
            transclude: true,
            templateUrl: '/portal/containers/default/default.container.html',
            scope: {
                container: '='
            }
        };
    }]);
});
