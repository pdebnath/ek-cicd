var winston = require('winston');
var dateFormat = require('dateformat');

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
    new winston.transports.File({ filename:'D:\\logs_easyknock\\debug.log',level: 'info', json: false,
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
     new winston.transports.File({ filename:'D:\\logs_easyknock\\exceptions.log', json: false })
  ],
  exitOnError: false
});
module.exports = logger;
