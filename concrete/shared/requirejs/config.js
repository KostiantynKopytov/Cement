(function (requirejs) {
    var requireCfg = {
        waitSeconds: 600,
        paths: {
            'name': '/shared/requirejs/plugins/name',
            'module': '/shared/requirejs/plugins/module',
            'css': '/shared/requirejs/plugins/css',
            'normalize': '/libs/normalize',
            'text': '/shared/requirejs/plugins/text',
            'json': '/shared/requirejs/plugins/json',
            'jquery': '/libs/jquery-1.9.1',
            'underscore': '/libs/underscore.min',
            'angular': '/libs/angular/angular',
            'angular-mocks': '/libs/angular/angular-mocks',
            'extensions': '/shared/helpers/extensions',
            'jquery-ui': '/libs/jquery-ui/jquery-ui-1.10.1.custom.min',
            'json2': '/libs/json2',
            'jquery-markitup': '/libs/markitup/jquery.markitup',
            
            // css
            'jquery-ui-styles': '/libs/jquery-ui/themes/ui-lightness/jquery-ui-1.10.1.custom.min',
            'markitup-styles': '/libs/markitup/skins/simple/style'
        },
        shim: {
            'angular': {
                deps: ['jquery'],
                exports: 'angular'
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
                deps: ['jquery', 'css!jquery-ui-styles']
            },
            'jquery-markitup': {
                deps: ['jquery', 'css!markitup-styles'],
                init: function ($) {
                    return $.fn.markItUp;
                }
            }
        }
    };

    requirejs.config(requireCfg);
    requirejs.onError = function(error) {
        console.error('require error: ', error);
    };
})(requirejs);

define(['jquery', 'underscore', 'angular', 'extensions', 'json2'], function() {
});
