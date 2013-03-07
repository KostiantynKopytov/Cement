define({
    load: function (name, req, onload, config) {
        var cssName = name;
        if (!cssName.match(/\.(less|css)$/)) {
            cssName = cssName + ".css";
        }

        req(['extensions'], function(ext) {
            var link = ext.appendStyles(name, '');
            req(['text!' + cssName], function (text) {
                var path = config.paths[name] || name;
                var slashPos = path.lastIndexOf('/');
                path = path.substring(0, slashPos >= 0 ? slashPos : path.length);
                text = text.replace(/url\s*\(\s*"(?!\/)/g, 'url("' + path + "/");
                link.text(text);
                onload(text);
            });
        });
    }
});