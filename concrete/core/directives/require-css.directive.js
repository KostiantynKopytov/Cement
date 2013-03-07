define(['jquery', 'module!core', 'require', 'extensions'], function($, module, require, ext) {
    module.directive('ctRequireCss', ['$compile', function($compile) {
        return {
            restrict: 'A',
            compile: function(tElement, tAttrs) {
                var content = tElement.clone();
                content.removeAttr('ct-require-css');
                return function (scope, element, attrs) {
                    var name = attrs.ctRequireCss;
                    require(['css!' + name], function (text) {
                        var link = ext.appendStyles(name, text);
                        link.attr('data-usage', (link.attr('data-usage') || 0) - (-1));

                        scope.$on('$destroy', function () {
                            link.attr('data-usage', (link.attr('data-usage') || 0) - 1);
                        });
                        var compiled = $compile(content)(scope);
                        element.replaceWith(compiled);
                        scope.$apply();
                    });
                };
            }
        };
    }]);
});