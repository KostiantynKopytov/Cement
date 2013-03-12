define({
    load: function (name, req, onload, config) {
        var cssName = name;
        if (!cssName.match(/\.(less|css)$/)) {
            cssName = cssName + ".css";
        }

        req(['extensions'], function() {
            var selector = String.Format("style[data-href='{0}']", name);
            var link = $(selector);

            if (!link.exists()) {
                link = $('<style type="text/css" />').attr('data-href', name).appendTo('head');
            }

            req(['text!' + cssName], function (text) {
                var path = config.paths[name] || name;
                var slashPos = path.lastIndexOf('/');
                path = path.substring(0, slashPos >= 0 ? slashPos : path.length);
                text = text.replace(/url\s*\(\s*"(?!\/)/g, 'url("' + path + "/");
                link.text(text);
                link.attr('data-usage', (link.attr('data-usage') || 0) - (-1));

                onload(text);
            });
        });
    }
});