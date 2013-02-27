(function (requirejs) {
    var requireCfg = {
        paths: {
            'module': '/shared/requirejs/plugins/module',
            'text': '/shared/requirejs/plugins/text',
            'json': '/shared/requirejs/plugins/json',
            'jquery': '/scripts/jquery-1.9.1.min',
            'underscore': '/scripts/underscore.min',
            'angular': '/scripts/angular.min',
            'angular-resource': '/scripts/angular-resource',
            'angular-mocks': '/scripts/angular-mocks',
            'extensions': '/shared/helpers/extensions',
            'jquery-ui': '/scripts/jquery-ui-1.10.1.custom.min'
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
            'angular-resource': {
                deps: ['angular']
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
