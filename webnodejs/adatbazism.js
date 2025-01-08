// Database Display Script
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./adatbazis'); // Import the database connection

// Configure Express app
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Main route to display the database
app.get('/display-database', (req, res) => {
    const songQuery = 'SELECT * FROM eurovision_songs';
    const eventQuery = 'SELECT * FROM eurovision_events';
    const langQuery = 'SELECT * FROM languages';

    // Fetch songs
    db.query(songQuery, (err, songs) => {
        if (err) {
            console.error('Error fetching songs:', err);
            return res.status(500).send('Error fetching songs');
        }

        // Fetch events
        db.query(eventQuery, (err, events) => {
            if (err) {
                console.error('Error fetching events:', err);
                return res.status(500).send('Error fetching events');
            }

            // Fetch languages
            db.query(langQuery, (err, languages) => {
                if (err) {
                    console.error('Error fetching languages:', err);
                    return res.status(500).send('Error fetching languages');
                }

                // Render the EJS template with the data
                res.render('display', {
                    songs: songs,
                    events: events,
                    languages: languages
                });
            });
        });
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/display-database`);
});

// EJS Template (views/display.ejs)
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Database Display</title>
</head>
<body>
    <h1>Eurovision Database</h1>

    <h2>Songs</h2>
    <table border="1">
        <tr>
            <th>Year</th>
            <th>Order</th>
            <th>Country</th>
            <th>Language</th>
            <th>Performer</th>
            <th>Original Title</th>
            <th>Translated Title</th>
            <th>Placement</th>
            <th>Points</th>
        </tr>
        <% songs.forEach(song => { %>
            <><tr>
                                <td>< />%= song.year %></td>
                                <td>< />%= song.order_in_show %></td>
                                <td>< />%= song.country %></td>
                                <td>< />%= song.language %></td>
                                <td>< />%= song.performer %></td>
                                <td>< />%= song.original_title %></td>
                                <td>< />%= song.translated_title %></td>
                                <td>< />%= song.placement %></td>
                                <td>< />%= song.points %></td>
                            </tr>< /></>% }); %>
    </table>

    <h2>Events</h2>
    <table border="1">
        <tr>
            <th>Year</th>
            <th>Date</th>
            <th>City</th>
            <th>Country</th>
            <th>Participants</th>
        </tr>
        <% events.forEach(event => { %>
            <><tr>
                                <td>< />%= event.year %></td>
                                <td>< />%= event.date %></td>
                                <td>< />%= event.city %></td>
                                <td>< />%= event.country %></td>
                                <td>< />%= event.number_of_participants %></td>
                            </tr>< /></>% }); %>
    </table>

    <h2>Languages</h2>
    <ul>
        <% languages.forEach(lang => { %>
            <li><%= lang.country %>: <%= lang.language %></li>
        <% }); %>
    </ul>
</body>
</html>
