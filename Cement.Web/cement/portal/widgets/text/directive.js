define(['module!core'], function(module) {
    module.directive('text', function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                settings: '='
            },
            templateUrl: "/cement/portal/widgets/text/template.html"
        };
    });
});