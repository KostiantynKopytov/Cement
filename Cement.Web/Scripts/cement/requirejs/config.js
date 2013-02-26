(function (requirejs) {
    var requireCfg = {
        paths: {
            _: '/scripts/underscore',
            jquery: '/scripts/jquery-1.9.1',
            angular: '/scripts/angular',
            'angular-resource': '/scripts/angular-resource',
            extensions: '/scripts/cement/helpers/extensions'
        },
        shim: {
            'angular': {
                exports: 'angular',
                init: function() {
                    return angular;
                }
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
                init: function() {
                    return $;
                }
            },            
            '_': {
                init: function() {
                    return _;
                }
            }
        }
    };

    requirejs.config(requireCfg);
    requirejs.onError = function(error) {
        console.error('require error: ', error);
    };
})(requirejs);

define(['jquery', '_', 'angular', 'extensions'], function() {
});
