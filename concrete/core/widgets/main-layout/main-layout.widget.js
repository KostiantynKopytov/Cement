define(['module!core'], function(module) {
    module.directive('ctMainLayout', [function() {
        return {
            templateUrl: '/core/widgets/main-layout/main-layout.widget.html',
            restrict: 'A',
            scope: {
                data: '=ctMainLayout'
            }
        };
    }]);
});