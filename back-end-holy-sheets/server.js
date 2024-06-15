const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'holysheetsdb'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected...');
});

app.get('/api/data', (req, res) => {
  let sql = 'SELECT * FROM your-table';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/data', (req, res) => {
  let data = { column1: req.body.column1, column2: req.body.column2 };
  let sql = 'INSERT INTO your-table SET ?';
  db.query(sql, data, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...data });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});