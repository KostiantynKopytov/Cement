define(['module!portal'], function(module) {
    module.directive('ctTestLayout', [function() {
        return {
            templateUrl: '/portal/widgets/test-layout/test-layout.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctTestLayout'
            }
        };
    }]);
});