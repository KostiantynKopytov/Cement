﻿(function (requirejs) {
    var requireCfg = {
        paths: {
            'name': '/shared/requirejs/plugins/name',
            'module': '/shared/requirejs/plugins/module',
            'text': '/shared/requirejs/plugins/text',
            'json': '/shared/requirejs/plugins/json',
            'jquery': '/libs/jquery-1.9.1.min',
            'underscore': '/libs/underscore.min',
            'angular': '/libs/angular/angular.min',
            'angular-mocks': '/libs/angular/angular-mocks',
            'extensions': '/shared/helpers/extensions',
            'jquery-ui': '/libs/jquery-ui-1.10.1.custom.min'
        },
        shim: {
            'angular': {
                exports: 'angular',
            },
            'angular-mocks': {
                deps: ['angular'],
                init: function(angular) {
                    return angular.mock;
                }
            },
            'jquery': {
                exports: '$'
            },            
            'underscore': {
                exports: '_'
            },
            'jquery-ui': {
                deps: ['jquery']
            }
        }
    };

    requirejs.config(requireCfg);
    requirejs.onError = function(error) {
        console.error('require error: ', error);
    };
})(requirejs);

define(['jquery', 'underscore', 'angular', 'extensions'], function() {
});