var winston = require('winston');
var dateFormat = require('dateformat');
var logfile=require('./logfile');
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
         json: false,  timestamp: function() {
        return dateFormat(new Date(), "yyyy-mmm-dd HH:MM:ss");
        },
         formatter: function(options) {
         return options.timestamp() +', '+ options.level.toUpperCase() +', '+ (options.message ? options.message : '');
        }
    }),
    //new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
    new winston.transports.File({ filename:logfile.debugFilePath+ '//easyknock_debug.log',level: logfile.logLevel, json: false,
        timestamp: function() {
            return dateFormat(new Date(), "yyyy-mmm-dd HH:MM:ss");
        },
         formatter: function(options) {
         return options.timestamp() +', '+ options.level.toUpperCase() +', '+ (options.message ? options.message : '');
        } 
    })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({ json: false, timestamp: true }),
    //new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
     new winston.transports.File({ filename:logfile.debugFilePath+ '//easyknock_exception.log',level: logfile.logLevel,  json: false })
  ],
  exitOnError: false
});
module.exports = logger;
