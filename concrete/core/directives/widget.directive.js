define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctWidget', ['$compile', function($compile) {
        return {
            restrict: 'A',
            scope: {
                name: '@ctWidget',
                data: '='
            },
            controller: ['$scope', '$element', '$attrs', function(scope, element, attrs) {
                scope.edit = function() {
                    scope.editor = {
                        widgetUrl: String.Format("/portal/widgets/{0}/{0}.editor.html", scope.name),
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
                scope.$watch('name', function (name) {
                    var wrapper = $('<div />');
                    var jqWidget = $('<div ct-' + name + '="data"/>');

                    wrapper.append(jqWidget);
                    wrapper.append($('<div ng-include />').attr('src', 'editor.widgetUrl'));
                    wrapper.append('<button class="btn btn-widget-editor" ng-click="edit()">Edit</button>');
                    var compiled = $compile(wrapper)(scope);
                    element.html('');
                    element.append(compiled);

                    console.log('widget compiled:', name, scope.data);
                });
            }
        };
    }]);
});
