define(['jquery', 'module!core'], function($, module) {
    module.directive('widget', ['$compile', function($compile) {
        return {
            restrict: 'E',
            scope: {
                widget: '=',
            },
            link: function (scope, element, attrs) {
                scope.$watch('widget.directive', function () {
                    var html = String.Format('<{0} settings="widget.settings"></{0}>', scope.widget.directive);
                    var compiled = $compile(html)(scope);
                    element.html(compiled);
                });
            }
        };
    }]);
});