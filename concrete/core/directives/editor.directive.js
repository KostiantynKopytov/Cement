define(['jquery', 'module!core', 'extensions'], function($, module, ext) {
    module.directive('ctEditor', ['$compile', '$interpolate', function ($compile, $interpolate) {
        return {
            restrict: 'A',
            compile: function (tElement, tAttrs) {
                tElement.append($('<div ng-include />').attr('src', 'editor.url'));

                return function(scope, element, attrs) {
                    var editorUrl = null;
                    
                    element.bind('dblclick', function(event) {
                        console.log('clicked');
                        scope.editor = {
                            context: ext.cleanClone(scope),
                            url: editorUrl,
                            ok: function() {
                                scope = ext.extend(scope, scope.editor.context);
                                console.log(scope);
                                scope.editor = null;
                            },
                            cancel: function() {
                                scope.editor = null;
                            }
                        };

                        event.stopPropagation();
                        scope.$apply();
                    });

                    scope.$watch(function() { return $interpolate(attrs.ctEditor)(scope); }, function(url) {
                        editorUrl = url;
                    });
                };
            },
        };
    }]);
});