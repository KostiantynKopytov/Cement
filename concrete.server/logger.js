(function(module, require) {
    var winston = require('winston');

    winston.loggers.add('default', {
        console: { level: 'silly', handleExceptions: true },
        file: { level: 'silly', handleExceptions: true, filename: 'server.log' }
    });

    var getLogger = function(name) {
        return winston.loggers.get(name || 'default');
    };
    getLogger('default').cli();

    module.exports.get = getLogger;
})(module, require);