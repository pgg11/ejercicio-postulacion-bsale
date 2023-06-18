const mySQL = require('mysql');
require('dotenv').config();

let conn;

function handleDisconnect() {
  try{
    conn = mySQL.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });

    conn.connect(function(err) {
      if (err) {
        console.error('Error connecting to database: ', err);
        throw err;
      } else {
        console.log('Connected to database.');
        startPing();
      }
    });

    conn.on('error', function(err) {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log("Connection lost. Attempting to reconnect...");
        handleDisconnect(); // Intenta la reconexión
      }else{
        console.error('Database connection error: ', err);
      }
    });
  } catch(err){
    return({code: 400, errors: "could not connect to db"});
  }
}

// Función para realizar un ping a la base de datos
function pingDatabase() {
  conn.ping((error) => {
    if (error) {
      console.error('Ping error:', error);
    } else {
      console.log('Successful ping, database available.');
    }
  });
}

// Función para iniciar el ping periódico
function startPing() {
  const pingInterval = 3000; // Intervalo de ping en milisegundos (3 segundos)

  setInterval(() => {
    pingDatabase();
  }, pingInterval);
}


handleDisconnect();

module.exports = {conn, handleDisconnect};