define([], function() {
    return function(module) {
        module.directive('requireCss', function() {
            return {
                restrict: 'E',
                link: function(scope, element, attrs) {
                    attrs.href = "css!" + attrs.href;
                    require([attrs.href]);
                    scope.$on("$destroy", function () {
                        console.log('destroyed');
                    });
                }
            };
        });
    };
});