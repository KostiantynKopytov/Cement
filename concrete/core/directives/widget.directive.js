define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctWidget', ['$compile', function($compile) {
        return {
            restrict: 'A',
            scope: {
                type: '@ctWidget',
                data: '='
            },
            link: function(scope, element, attrs) {
                scope.$watch('type', function (type) {
                    var editorUrl = String.Format("/portal/widgets/{0}/{0}.editor.html", scope.type);
                    var wrapper = $('<div/>');
                    var jqWidget = $('<div ct-' + type + '="data"/>').attr('ct-editor', editorUrl);

                    wrapper.append(jqWidget);
                    wrapper.append($('<div ng-include />').attr('src', 'editor.widgetUrl'));
                    var compiled = $compile(wrapper)(scope);
                    element.html('');
                    element.append(compiled);

                    console.log('widget compiled:', type, scope.data);
                });
            }
        };
    }]);
});
