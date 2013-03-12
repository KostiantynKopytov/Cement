define(['module!core'], function(module) {
    module.directive('ctText', [function() {
        return {
            templateUrl: '/core/widgets/text/text.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctText'
            }
        };
    }]);
});
