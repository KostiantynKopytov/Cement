define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctWidget', ['$compile', function($compile) {
        return {
            restrict: 'A',
            scope: {
                type: '@ctWidget',
                data: '='
            },
            controller: ['$scope', '$element', '$attrs', function(scope, element, attrs) {
                scope.edit = function() {
                    scope.editor = {
                        widgetUrl: String.Format("/portal/widgets/{0}/{0}.editor.html", scope.type),
                        data: ext.extend(scope.data),
                        ok: function () {
                            scope.data = ext.extend(scope.data, scope.editor.data);
                            console.log(scope.data);
                            scope.editor = null;
                        },
                        cancel: function() {
                            scope.editor = null;
                        }
                    };
                };
            }],
            link: function(scope, element, attrs) {
                scope.$watch('type', function (type) {
                    var wrapper = $('<div ng-dblclick="edit()" />');
                    var jqWidget = $('<div ct-' + type + '="data" />');

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
