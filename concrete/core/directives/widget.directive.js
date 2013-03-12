define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctWidget', ['$compile', '$http', function($compile, $http) {
        return {
            restrict: 'A',
            scope: {
                type: '@ctWidget',
                data: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('type', function (type) {
                    var editorUrl = String.Format("/portal/widgets/{0}/{0}.editor.html", scope.type);
                    var jqWidget = $('<div ct-' + type + '="data"/>');
                    $.get(editorUrl).done(function() {
                        jqWidget.attr('ct-editor', editorUrl);
                    }).always(function() {
                        var compiled = $compile(jqWidget)(scope);
                        element.html('').append(compiled);
                    });
                });
            }
        };
    }]);
});
