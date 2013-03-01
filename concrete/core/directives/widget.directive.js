define(['jquery', 'module!core', 'extensions'], function($, module) {
    module.directive('ctWidget', ['$compile', function($compile) {
        return {
            restrict: 'E',
            scope: {
                widget: '='
            },
            controller: ['$scope', '$element', '$attrs', function(scope, element, attrs) {
                scope.edit = function() {
                    scope.editor = {
                        widgetUrl: String.Format("/portal/widgets/{0}/{0}.editor.html", scope.widget.name),
                        containerUrl: String.Format("/portal/containers/{0}/{0}.editor.html", scope.widget.container.name),
                        container: $.extend({}, scope.widget.container),
                        settings: $.extend({}, scope.widget.settings),
                        ok: function() {
                            $.extend(scope.widget.container, scope.editor.container);
                            $.extend(scope.widget.settings, scope.editor.settings);
                            scope.editor = null;
                        },
                        cancel: function() {
                            scope.editor = null;
                        }
                    };
                };
            }],
            link: function(scope, element, attrs) {
                scope.$watch('widget', function(widget) {
                    var jqContainer = $('<ct-container-' + widget.container.name + ' container="widget.container" />');
                    var jqWidget = $('<ct-' + widget.name + ' settings="widget.settings"/>');

                    jqContainer.append(jqWidget);
                    jqContainer.append($('<ng-include />').attr('src', 'editor.widgetUrl'));
                    jqContainer.append('<button class="btn" ng-click="edit()">Edit</button>');
                    var compiled = $compile(jqContainer)(scope);
                    element.html('');
                    element.append(compiled);
                });
            }
        };
    }]);
});