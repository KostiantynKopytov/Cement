require(['../requirejs/config'], function() {
    require(['module!core!deps'], function(core) {
        var html = document.getElementsByTagName('html');
        angular.bootstrap(html, ['core']);
    });
});