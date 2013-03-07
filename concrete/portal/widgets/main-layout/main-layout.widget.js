define(['module!portal'], function(module) {
    module.directive('ctMainLayout', [function() {
        return {
            templateUrl: '/portal/widgets/main-layout/main-layout.widget.html',
            restrict: 'A',
            scope: {
                data: '=ctMainLayout'
            }
        };
    }]);
});