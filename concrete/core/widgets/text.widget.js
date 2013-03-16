define(['module!core'], function(module) {
    module.directive('ctText', [function() {
        return {
            templateUrl: '/core/widgets/text.widget.html',
            replace: true,
            restrict: 'A',
            scope: {
                data: '=ctText'
            }
        };
    }]);
});
