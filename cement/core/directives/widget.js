define(['jquery', 'module!core'], function ($, module) {
    module.directive('widget', ['$compile', function($compile) {
        return {
            restrict: 'E',
            scope: {
                widget: '=',
            },
            link: function (scope, element) {
                scope.$watch('widget.settings.template', function (newval, oldval) {
                    var html = String.Format('<{0}-{1} settings="widget.settings"></{0}-{1}>', scope.widget.directive, newval || 'template');
                    var compiled = $compile(html)(scope);
                    element.html('').append(compiled);
                });
            }
        };
    }]);
});