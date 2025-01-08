const mysql = require('mysql2');

// MySQL kapcsolat létrehozása 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    port:'3306',
    password: '',
    database: 'eurovisiondb'
  });
  
  db.connect((err) => {
    if (err) {
      console.error('Hiba az adatbázishoz való csatlakozáskor: ' + err.stack);
      return;
    }
    console.log('Sikeres csatlakozás az adatbázishoz.');
  });