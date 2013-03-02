define(['jquery', 'module!core', 'extensions', 'jquery-ui'], function ($, module) {
    module.directive('ctPlaceholder', ['$compile', function() {
        return {
//            replace: true,
            template: '<li ct-widget widget="widget" ng-repeat="widget in widgets"></li>',
            restrict: 'EA',
            scope: {
                widgets: '='
            },
            link: function (scope, element, attrs) {
                var links = $("link[data-usage='0']");
                links.remove();
            }
        };
    }]);
});
