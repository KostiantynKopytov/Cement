(function(module, require) {
    var winston = require('winston');

    winston.loggers.add('default', {
        console: { level: 'silly', handleExceptions: true },
        file: { level: 'silly', handleExceptions: true, filename: 'server.log' }
    });

    function getLogger(name) {
        return winston.loggers.get(name || 'default');
    };

    getLogger().cli();

    module.exports.get = getLogger;
})(module, require);