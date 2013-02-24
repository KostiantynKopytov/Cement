define([], function() {
    return {
        name: 'requireCss',
        factory: function () {
            return {
                restrict: 'E',
                link: function (scope, element, attrs) {
                    attrs.href = "css!" + attrs.href;
                    require([attrs.href]);
                }
            };
        }
    };
});
