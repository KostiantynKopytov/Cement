define(['jquery', 'module!core', 'require'], function($, module, require) {
    module.directive('ctRequireCss', ['$compile', function ($compile) {
        return {
            restrict: 'A',
            template: '',
            replace: true,
            compile: function(tElement, tAttrs) {

                var content = tElement.contents();
                tElement.html('');

                return function(scope, element, attrs) {

                    require(['css!' + attrs.ctRequireCss], function () {
                        var selector = String.Format("link[href='{0}']", attrs.ctRequireCss);
                        var link = $(selector);

                        if (!link.exists()) {
                            link = $('<link type="text/css" rel="stylesheet" />').attr("data-usage", "1").attr('href', attrs.ctRequireCss).appendTo('head');
                        } else {
                            link.attr('data-usage', (link.attr('data-usage') || 0) - (-1));
                        }

                        scope.$on('$destroy', function () {
                            link.attr('data-usage', (link.attr('data-usage') || 0) - 1);
                        });
                        
                        var compiled = $compile($('<div />').append(content))(scope);
                        
                        element.append(compiled.contents());

                        scope.$apply();

                    });

                };
            }
        };
    }]);
});