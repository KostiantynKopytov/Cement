define(['module!portal'], function(module) {
    module.directive('ctMultiColumn', [function() {
        return {
            templateUrl: '/portal/widgets/multi-column/multi-column.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctMultiColumn'
            }
        };
    }]);
});