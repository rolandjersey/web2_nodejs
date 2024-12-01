const mysql = require('mysql2');

// MySQL kapcsolat létrehozása 
const db = mysql.createConnection({
    host: '0.0.0.0',
    user: 'student',
    password: '12345678',
    database: 'database'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Hiba az adatbázishoz való csatlakozáskor: ' + err.stack);
      return;
    }
    console.log('Sikeres csatlakozás az adatbázishoz.');
  });