var sqlDb = require("mssql");
var settings = require("../settings");
//console.log(sqlDb);

exports.executeSql = function (sql, callback) {

	var conn =  new sqlDb.ConnectionPool(settings.dbConfig);
    conn.connect()
    .then(function () {
		var req = new sqlDb.Request(conn);
        req.query(sql)
        .then(function (recordset) {
			//conn.close();
			callback(recordset);
        })
        .catch(function (err) {
			console.log(err);
			callback(null, err);
		});
    })
    .catch(function (err) {
		console.log(err);
		callback(null, err);
	});
};