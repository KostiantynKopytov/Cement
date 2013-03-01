define(['jquery', 'module!core', 'extensions'], function ($, module) {
    module.directive('ctWidget', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            controller: ['$scope', '$element', '$attrs', function (scope, element, attrs) {
                scope.edit = function () {
                    scope.editorUrl = String.Format("/portal/widgets/{0}/{0}.editor.html", scope.widget.name);
                    scope.container = $.extend({}, scope.widget.container);
                    scope.settings = $.extend({}, scope.widget.settings);
                };

                scope.ok = function () {
                    $.extend(scope.widget.container, scope.container);
                    $.extend(scope.widget.settings, scope.settings);
                    scope.editorUrl = null;
                };

                scope.cancel = function () {
                    scope.editorUrl = null;
                };
            }],
            link: function(scope, element, attrs) {
                scope.$watch('widget', function (widget) {

                    var div = $('<ct-container-default container="widget.container" />');

                    var jqWidget = $('<ct-' + widget.name + '/>');
                    for (var key in widget.settings) {
                        jqWidget.attr(key, "widget.settings." + key);
                    }
                    

                    div.append(jqWidget);
                    div.append($('<ng-include />').attr('src', 'editorUrl'));
                    div.append('<button class="btn" ng-click="edit()">Edit</button>');
                    var compiled = $compile(div)(scope);
                    element.html('');
                    element.append(compiled);
                    
                });
            }
        };
    }]);
});
