define(['jquery', 'module!core', 'extensions'], function ($, module) {
    module.directive('ctPlaceholder', ['$compile', function() {
        return {
            replace: true,
            template: '<ct-widget ng-repeat="widget in widgets"></ct-widget>',
            restrict: 'E',
            scope: {
                widgets: '='
            },
        };
    }]);
});
