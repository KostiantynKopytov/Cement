define(['module!core', 'extensions'], function (module, extensions) {
    extensions.registerDirectives(module, 'text', ['template'], function (templateUrl) {
        return [function () {
            return {
                restrict: 'E',
                scope: {
                    settings: '='
                },
                templateUrl: templateUrl
            };
        }];
    });
});