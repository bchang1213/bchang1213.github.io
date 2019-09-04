const { Pool, Client } = require('pg');

const config = require('../server/config/db_cred.json');

const db = {};

db.execute = (sql, params, callback) => {
    const client = new Client({
        user: config.db.user,
        host: config.db.host,
        password: config.db.pass,
        database: config.db.database,
        port: config.db.port || 5432
    });


    client.connect((err) => {
        if (err) {
            // logger.error('problems with connecting to db ' + err);
            return callback(err, null);
        }
    });

    client.query(sql, params, (err, results) => {
        if (err) {
            // logger.error('query string', sql, 'params', params, ' err: ', err);
            callback(err);
        } else {
            callback(null, results.rows);
        }

        client.end();
    });
};

db.getObject = (sql, params, callback) => {
    return db.execute(sql, params, (err, results) => {
        if (err) {
            callback(err);
        } else if (results.length == 1) {
            callback(null, results[0]);
        } else {
            callback(null, null);
        }
    });
};

module.exports = db;
