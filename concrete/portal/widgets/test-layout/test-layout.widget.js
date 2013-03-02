define(['module!portal', 'jquery', 'name!.'], function(module, $, widgetUrl) {
    module.directive('ctTestLayout', [function() {
        return {
            templateUrl: widgetUrl + '/test-layout.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                settings: '='
            }
        };
    }]);
});