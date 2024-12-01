const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./adatbazis'); // Adatbázis modul importálása

// Alkalmazás beállításai
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json()); // JSON body parser
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
  });
  
  app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Kapcsolat' });
  });
  
  // CRUD műveletek
app.get('/crud', (req, res) => {
  db.query('SELECT * FROM nyelv', (error, results) => {
    if (error) throw error;
    res.render('crud', { records: results });
  });
});

// Lekérdezés a nyelv táblából
app.get('/get_records', (req, res) => {
  const query = 'SELECT * FROM nyelv'; // Lekérdezi az összes rekordot a nyelv táblából
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results); // Visszaküldi a rekordokat JSON formátumban
  });
});

// Egy adott rekord lekérdezése a nyelv táblából
app.get('/get_record/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM nyelv WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.json(result[0]); // Visszaadjuk az adott rekordot JSON formátumban
  });
});

// Új rekord hozzáadása a nyelv táblához
app.post('/create_record', (req, res) => {
  const { orszag, nyelv } = req.body;
  const query = 'INSERT INTO nyelv (orszag, nyelv) VALUES (?, ?)';
  db.query(query, [orszag, nyelv], (err, result) => {
    if (err) throw err;
    res.sendStatus(201); // Sikeres hozzáadás után státuszkód visszaadása
  });
});

// Rekord frissítése a nyelv táblában
app.post('/update_record', (req, res) => {
  const { id, orszag, nyelv } = req.body;

  // Először lekérdezzük az aktuális rekordot
  db.query('SELECT * FROM nyelv WHERE id = ?', [id], (err, result) => {
    if (err) throw err;

    const currentRecord = result[0];

    // Ha egy mező üres, megtartjuk az eredeti értékét
    const updatedOrszag = orszag || currentRecord.orszag;
    const updatedNyelv = nyelv || currentRecord.nyelv;

    const query = 'UPDATE nyelv SET orszag = ?, nyelv = ? WHERE id = ?';
    db.query(query, [updatedOrszag, updatedNyelv, id], (err, result) => {
      if (err) throw err;
      res.sendStatus(200); // Sikeres frissítés
    });
  });
});

// Rekord törlése a nyelv táblából
app.delete('/delete_record/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM nyelv WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.sendStatus(200); // Sikeres törlés után státuszkód visszaadása
  });
});
  
  // Lekérdezés a nyelv táblából 10 rekordra limitálva.
  app.get('/database', (req, res) => {
    const dalQuery = 'SELECT * FROM dal LIMIT 10';
    const nyelvQuery = 'SELECT * FROM nyelv LIMIT 10';
    const versenyQuery = 'SELECT * FROM verseny LIMIT 10';
  
    // Több lekérdezés végrehajtása
    db.query(dalQuery, (err, dalResults) => {
      if (err) throw err;
  
      db.query(nyelvQuery, (err, nyelvResults) => {
        if (err) throw err;
  
        db.query(versenyQuery, (err, versenyResults) => {
          if (err) throw err;
  
          // Továbbítjuk az adatokat az EJS fájlnak
          res.render('database', {
            dal: dalResults,
            nyelv: nyelvResults,
            verseny: versenyResults
          });
        });
      });
    });
  });
  
  // Üzenetek oldal
app.get('/messages', (req, res) => {
  const sql = 'SELECT * FROM uzenetek ORDER BY timestamp DESC'; // Üzenetek lekérdezése időrendben
  db.query(sql, (err, results) => {
    if (err) throw err;

    res.render('messages', { title: 'Üzenetek', uzenetek: results }); // Az üzenetek átadása az EJS-nek
  });
});

// Üzenet küldése
app.post('/send_message', (req, res) => {
  const { name, email, message } = req.body;

  const sql = 'INSERT INTO uzenetek (nev, email, uzenet) VALUES (?, ?, ?)';
  db.query(sql, [name, email, message], (err, result) => {
      if (err) throw err;

      console.log('Message sent:', result);
      res.redirect('/messages'); // átirányítás a messages oldalra
  });
});
  
  app.get('/oop', (req, res) => {
    res.render('oop', { title: 'OOP Javascript' });
  });

const port = 8021;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
