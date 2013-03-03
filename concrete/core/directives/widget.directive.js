define(['jquery', 'module!core', 'extensions'], function($, module) {
    module.directive('ctWidget', ['$compile', function($compile) {
        return {
            restrict: 'A',
            scope: {
                name: '@',
                settings: '='
            },
            controller: ['$scope', '$element', '$attrs', function(scope, element, attrs) {
                scope.edit = function() {
                    scope.editor = {
                        widgetUrl: String.Format("/portal/widgets/{0}/{0}.editor.html", scope.name),
                        settings: $.extend({}, scope.settings),
                        ok: function () {
                            
                            scope.settings = $.extend({}, scope.settings, scope.editor.settings);
                            console.log(scope.settings);
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
                    var jqWidget = $('<div ct-' + scope.name + ' settings="settings"/>');

                    wrapper.append(jqWidget);
                    wrapper.append($('<div ng-include />').attr('src', 'editor.widgetUrl'));
                    wrapper.append('<button class="btn btn-widget-editor" ng-click="edit()">Edit</button>');
                    var compiled = $compile(wrapper)(scope);
                    element.html('');
                    element.append(compiled);
                });
            }
        };
    }]);
});
