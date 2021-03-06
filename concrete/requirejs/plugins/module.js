﻿define({
    load: function (name, req, onload, config) {
        var syntax = name.split('!');
        if (syntax.length > 1 && syntax[1] == 'deps') {
            req(['module!' + syntax[0], syntax[0] + '/**/*.js~amd'], function (module, deps) {
                onload(module);
            });
        } else {
            req(['angular'], function (angular) {
                onload(angular.module(syntax[0], []));
            });
        }
    }
});