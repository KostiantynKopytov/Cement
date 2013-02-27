define(['module!core'], function(module) {
    module.directive('text', function() {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                settings: '='
            },
            templateUrl: "/portal/widgets/text/template.html"
        };
    });
});