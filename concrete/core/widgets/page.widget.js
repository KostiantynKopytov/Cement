define(['module!core'], function(module) {
    module.directive('ctPage', [function() {
        return {
            templateUrl: '/core/widgets/page.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctPage'
            }
        };
    }]);
});
