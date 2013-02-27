define(['module!core', 'extensions', 'json!./$templates'], function (module, extensions, templates) {
    extensions.registerDirectives(module, 'text', templates, function (templateUrl) {
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