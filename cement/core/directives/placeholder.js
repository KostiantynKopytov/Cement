define(['jquery', 'module!core'], function ($, module) {
    module.directive('placeholder', ['$compile', function($compile) {
        return {
            replace: true,
            template: '<widget widget="widget" ng-repeat="widget in widgets"></widget>',
            restrict: 'E',
            scope: {
                widgets: '='
            }
        };
    }]);
});