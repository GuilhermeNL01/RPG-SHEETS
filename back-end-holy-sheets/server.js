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


connection.connect(error => {
  if (error) throw error;
  console.log('Banco de dados conectado!');
});
/////////////////////////////////////////////////////////////////
// Rotas CRUD pro cadastro do usuário
app.get('/cadastros', (req, res) => {
  const sql = 'SELECT * FROM cadastros';
  connection.query(sql, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.post('/cadastros', (req, res) => {
  const sql = 'INSERT INTO cadastros SET ?';
  const newItem = req.body;
  connection.query(sql, newItem, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.put('/cadastros/:id_usuario', (req, res) => {
  const sql = 'UPDATE cadastros SET ? WHERE id = ?';
  const id = req.params.id;
  const updatedItem = req.body;
  connection.query(sql, [updatedItem, id], (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.delete('/cadastros/:id_usuario', (req, res) => {
  const sql = 'DELETE FROM cadastros WHERE id = ?';
  const id = req.params.id;
  connection.query(sql, id, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});
/////////////////////////////////////////////////////////////
// Rotas CRUD pra ficha do usuário
app.get('/ficha', (req, res) => {
  const sql = 'SELECT * FROM ficha';
  connection.query(sql, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.post('/ficha', (req, res) => {
  const sql = 'INSERT INTO ficha SET ?';
  const newItem = req.body;
  connection.query(sql, newItem, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.put('/ficha/:id_ficha', (req, res) => {
  const sql = 'UPDATE ficha SET ? WHERE id = ?';
  const id = req.params.id;
  const updatedItem = req.body;
  connection.query(sql, [updatedItem, id], (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.delete('/ficha/:id_ficha', (req, res) => {
  const sql = 'DELETE FROM ficha WHERE id = ?';
  const id = req.params.id;
  connection.query(sql, id, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});