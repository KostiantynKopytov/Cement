define(['jquery', 'module!core', 'extensions'], function ($, module) {
    module.directive('ctContainerDefault', [function () {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: '/portal/containers/default/default.container.html',
            scope: {
                container: '='
            },
        };
    }]);
});
