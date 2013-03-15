define({
    load: function(name, req, onload, config) {
        var cssName = config.paths[name] || name;
        if (!cssName.match(/\.(less|css)$/)) {
            cssName = cssName + ".css";
        }
        req(['extensions', 'jquery', 'text!' + cssName], function(ext, $, text) {
            var slashPos = cssName.lastIndexOf('/');
            cssName = cssName.substring(0, slashPos >= 0 ? slashPos : cssName.length);
            text = text.replace(/url\s*\(\s*"(?!\/)/g, 'url("' + cssName + "/");
            var style = String.Format('<style type="text/css">{0}</style>', text);
            $('head').append(style);
            onload(text);
        });
    }
});