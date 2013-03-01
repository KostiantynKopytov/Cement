define(['jquery', 'module!core', 'extensions'], function ($, module) {
    module.directive('ctWidget', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            link: function(scope, element, attrs) {
                scope.$watch('widget', function (widget) {
                    var jqWidget = $('<ct-' + widget.name + '/>');
                    for (var key in widget.settings) {
                        jqWidget.attr(key, "widget.settings." + key);
                    }

                    var compiled = $compile(jqWidget)(scope);
                    element.html('');
                    element.append(compiled);
                    
                    console.log(jqWidget.outerHtml());
                });
            }
        };
    }]);
});
