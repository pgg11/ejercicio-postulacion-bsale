const mySQL = require('mysql');

const conn = mySQL.createConnection({
    // host, user, password serán cambiados por los proporcionados en el momento del despliegue
    host: 'localhost',
    user: 'root',
    password: 'Postre_11',
    database: 'airline'
});

try{
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
  });
}catch(err){
  console.error(err)
  return {code: 400, errors: "could not connect to db"}
}


module.exports = {conn};