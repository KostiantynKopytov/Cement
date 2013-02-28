define({
    load: function(name, req, onload, config) {
        var deps = 'json!/' + name + '/**/*.js~noext';
        req([deps, name + '/module'], function(files) {
            req(files, function () {
                onload(files);
            });
        });
    }
});