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


db.connect(error => {
  if (error) throw error;
  console.log('Banco de dados conectado!');
});
/////////////////////////////////////////////////////////////////
// Rotas CRUD pro cadastro do usuário
app.get('/cadastros', async (req, res) => {
  const { nome_usuario, senha_usuario } = req.query;

  // Consulta no banco de dados
  const user = await db.query('SELECT * FROM cadastros WHERE nome_usuario = ? AND senha_usuario = ?', [nome_usuario, senha_usuario]);

  if (user.length > 0) {
    // Usuário encontrado, login bem-sucedido
    res.status(200).json({ message: 'Login bem-sucedido' });
  } else {
    // Usuário não encontrado, login falhou
    res.status(401).json({ message: 'Credenciais inválidas' });
  }
});



app.post('/cadastros', (req, res) => {
  const sql = 'INSERT INTO cadastros SET ?';
  const newItem = req.body;
  db.query(sql, newItem, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.put('/cadastros/:id_usuario', (req, res) => {
  const sql = 'UPDATE cadastros SET ? WHERE id = ?';
  const id = req.params.id;
  const updatedItem = req.body;
  db.query(sql, [updatedItem, id], (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.delete('/cadastros/:id_usuario', (req, res) => {
  const sql = 'DELETE FROM cadastros WHERE id = ?';
  const id = req.params.id;
  db.query(sql, id, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});
/////////////////////////////////////////////////////////////
// Rotas CRUD pra ficha do usuário
app.get('/ficha', (req, res) => {
  const sql = 'SELECT * FROM ficha';
  db.query(sql, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.post('/ficha', (req, res) => {
  const sql = 'INSERT INTO ficha SET ?';
  const newItem = req.body;
  db.query(sql, newItem, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.put('/ficha/:id_ficha', (req, res) => {
  const sql = 'UPDATE ficha SET ? WHERE id = ?';
  const id = req.params.id;
  const updatedItem = req.body;
  db.query(sql, [updatedItem, id], (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.delete('/ficha/:id_ficha', (req, res) => {
  const sql = 'DELETE FROM ficha WHERE id = ?';
  const id = req.params.id;
  db.query(sql, id, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});