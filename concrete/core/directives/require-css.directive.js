define(['jquery', 'module!core', 'require', 'extensions'], function($, module, require, ext) {
    module.directive('ctRequireCss', ['$compile', function($compile) {
        return {
            restrict: 'A',
            compile: function(tElement, tAttrs) {
                var content = tElement.clone();
                content.removeAttr('ct-require-css');
                tElement.html('');
                return function (scope, element, attrs) {
                    var name = attrs.ctRequireCss;
                    require(['css!' + name], function () {
                        var compiled = $compile(content)(scope);
                        element.replaceWith(compiled);
                        scope.$apply();

                        scope.$on('$destroy', function () {
                            var selector = String.Format("style[data-href='{0}']", name);
                            var link = $(selector);
                            link.attr('data-usage', (link.attr('data-usage') || 0) - 1);
                        });
                    });
                };
            }
        };
    }]);
});