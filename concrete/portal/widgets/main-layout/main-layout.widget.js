define(['module!portal'], function(module) {
    module.directive('ctMainLayout', [function() {
        return {
            templateUrl: '/portal/widgets/main-layout/main-layout.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctMainLayout'
            }
        };
    }]);
});