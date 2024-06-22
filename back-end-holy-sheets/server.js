const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;
const secret = 'amongus';

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
app.post('/login', (req, res) => {
  const { nome_usuario, senha_usuario } = req.body;

  const sql = 'SELECT * FROM cadastros WHERE nome_usuario = ?';
  db.query(sql, [nome_usuario], (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];
      bcrypt.compare(senha_usuario, user.senha_usuario, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
          return res.json({ token });
        } else {
          return res.status(401).json({ message: 'Senha incorreta' });
        }
      });
    } else {
      res.status(401).json({ message: 'Usuário não encontrado' });
    }
  });
});




app.post('/cadastros', (req, res) => {
  const { nome_usuario, senha_usuario, ...rest } = req.body; // nome_usuario e senha_usuario são campos do corpo da requisição
  bcrypt.hash(senha_usuario, 10, (err, hash) => {
      if (err) throw err;
      const newItem = { ...rest, nome_usuario, senha_usuario: hash }; // Atualiza o objeto newItem com a senha hash

      const sql = 'INSERT INTO cadastros SET ?';
      db.query(sql, newItem, (error, results) => {
          if (error) throw error;
          res.send({ message: 'Usuário registrado com sucesso', results });
      });
  });
});

app.put('/cadastros/:id_usuario', (req, res) => {
  const sql = 'UPDATE cadastros SET ? WHERE id_usuario = ?';
  const id = req.params.id;
  const updatedItem = req.body;
  db.query(sql, [updatedItem, id], (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.delete('/cadastros/:id_usuario', (req, res) => {
  const sql = 'DELETE FROM cadastros WHERE id_usuario = ?';
  const id = req.params.id;
  db.query(sql, id, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extrai o token do cabeçalho

  if (!token) {
    return res.status(401).send('Token não fornecido');
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).send('Token inválido');
    }
    req.user = user;
    next();
  });
};

// Rota protegida para obter o perfil do usuário
app.get('/cadastros', authenticateToken, (req, res) => {
  const id_usuario = req.user.id;
  db.query('SELECT * FROM cadastros WHERE id_usuario = ?', [id_usuario], (err, results) => {  
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results[0]);
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
  const sql = 'UPDATE ficha SET ? WHERE id_ficha = ?';
  const id = req.params.id;
  const updatedItem = req.body;
  db.query(sql, [updatedItem, id], (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.delete('/ficha/:id_ficha', (req, res) => {
  const sql = 'DELETE FROM ficha WHERE id_ficha = ?';
  const id = req.params.id;
  db.query(sql, id, (error, results) => {
      if (error) throw error;
      res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});