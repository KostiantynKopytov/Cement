define({
    load: function (name, req, onload, config) {
        var syntax = name.split('!');
        if (syntax.length > 1 && syntax[1] == 'deps') {
            var deps = 'json!/' + syntax[0] + '/**/*.js~noext';
            req(['module!' + syntax[0], deps], function (module, files) {
                req(files, function () {
                    onload(module);
                });
            });
        } else {
            req(['angular'], function () {
                onload(angular.module(syntax[0], []));
            });
        }
    }
});