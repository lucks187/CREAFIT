const mysql = require('promise-mysql')

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'Pollitoel1.',
    database: 'creafit'
})

function getConnection(){
    return connection;
}

module.exports = {getConnection}