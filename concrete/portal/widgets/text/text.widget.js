define(['module!portal', 'jquery', 'name!.'], function(module, $, widgetUrl) {
    module.directive('ctText', [function() {
        return {
            templateUrl: widgetUrl + '/text.widget.html',
            replace: true,
            restrict: 'E',
            scope: {
                settings: '='
            }
        };
    }]);
});