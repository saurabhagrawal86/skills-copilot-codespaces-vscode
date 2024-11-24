// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Method: GET
// Get all comments
app.get('/comments', function (req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
        res.end(data);
    });
});

// Method: POST
// Add comment
app.post('/comments', function (req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        fs.writeFile(__dirname + '/comments.json', JSON.stringify(data, null, 4), function (err) {
            res.end(JSON.stringify(data));
        });
    });
});

// Method: DELETE
// Delete all comments
app.delete('/comments', function (req, res) {
    fs.writeFile(__dirname + '/comments.json', '[]', function (err) {
        res.end(JSON.stringify([]));
    });
});

// Method: GET
// Get comment by id
app.get('/comments/:id', function (req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        var comment = data[req.params.id];
        res.end(JSON.stringify(comment));
    });
});

// Method: PUT
// Update comment by id
app.put('/comments/:id', function (req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        data[req.params.id] = req.body;
        fs.writeFile(__dirname + '/comments.json', JSON.stringify(data, null, 4), function (err) {
            res.end(JSON.stringify(data));
        });
    });
});

// Method: DELETE
// Delete comment by id
app.delete('/comments/:id', function (req, res) {
    fs.readFile(__dirname + '/comments.json', 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.splice(req.params.id, 1);
        fs.writeFile(__dirname + '/comments.json', JSON.stringify(data, null, 4), function (err) {
            res.end(JSON.stringify(data));
        });
    });
});

app.listen(3000, function () {
    console.log('Server started: http://localhost:3000/');
});