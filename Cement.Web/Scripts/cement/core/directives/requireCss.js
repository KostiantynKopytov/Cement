define([], function () {
    var increment = 0;
    return function(module) {
        module.directive('requireCss', function() {
            return {
                restrict: 'E',
                link: function(scope, element, attrs) {
                    //attrs.href = "css!" + attrs.href;

                    var headId = document.getElementsByTagName("head")[0];
                    var cssNode = document.createElement('link');
                    cssNode.type = 'text/css';
                    cssNode.rel = 'stylesheet';
                    cssNode.href = attrs.href;
                    cssNode.id = 'cssfile' + ++increment;
                    headId.appendChild(cssNode);

                    //require([attrs.href]);
                    scope.$on("$destroy", function () {
                        var node = document.getElementById(cssNode.id);
                        node.parentNode.removeChild(node);
                    });
                }
            };
        });
    };
});