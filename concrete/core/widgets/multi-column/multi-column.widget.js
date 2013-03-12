define(['module!core'], function(module) {
    module.directive('ctMultiColumn', [function() {
        return {
            templateUrl: '/core/widgets/multi-column/multi-column.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctMultiColumn'
            }
        };
    }]);
});