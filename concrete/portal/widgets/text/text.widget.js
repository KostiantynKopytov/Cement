define(['module!portal', 'jquery', 'name!.'], function(module, $, widgetUrl) {
    module.directive('ctText', [function() {
        return {
            templateUrl: widgetUrl + '/text.widget.html',
            replace: true,
            restrict: 'E',
            scope: {
                content: '='
            },
            link: function() {
                console.log('ct-text');
            },
            controller: ['$scope', '$element', '$attrs', function (scope, element, attrs) {
                scope.edit = function () {
                    scope.editorUrl = widgetUrl + "/text.editor.html";
                    scope.editor = { content: scope.content };
                };

                scope.ok = function () {
                    $.extend(scope, scope.editor);
                    scope.editorUrl = null;
                };

                scope.cancel = function () {
                    scope.editorUrl = null;
                };
            }]
        };
    }]);
});