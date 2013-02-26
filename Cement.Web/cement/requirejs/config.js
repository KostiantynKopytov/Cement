(function (requirejs) {
    var requireCfg = {
        paths: {
            module: '/cement/requirejs/plugins/module',
            jquery: '/scripts/jquery-1.9.1.min',
            underscore: '/scripts/underscore.min',
            angular: '/scripts/angular.min',
            'angular-resource': '/scripts/angular-resource',
            'angular-mocks': '/scripts/angular-mocks',
            extensions: '/cement/helpers/extensions'
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
