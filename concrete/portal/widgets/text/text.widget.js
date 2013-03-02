define(['module!portal'], function(module) {
    module.directive('ctText', [function() {
        return {
            templateUrl: '/portal/widgets/text/text.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                settings: '='
            }
        };
    }]);
});