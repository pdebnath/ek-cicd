var mysql = require('mysql');
var db=require('./database');
var pool      =    mysql.createPool({
    host     : db.host,
    user     : db.user,
    password : db.password,
    database : db.database,
    connectionLimit : db.connections,
    debug    :  false,
    multipleStatements: true
});  
/* This function retuns connection from connection pool*/
var getConnection = function(callback) {
    pool.getConnection(function(err, conn) {
        callback(conn,err);
    });
};
module.exports = getConnection;
//connection.release();