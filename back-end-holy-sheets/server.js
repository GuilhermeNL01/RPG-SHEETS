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

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

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

// Login route
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
          const token = jwt.sign({ id_usuario: user.id_usuario }, secret, { expiresIn: '1h' });
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

// Route to register a user
app.post('/cadastros', (req, res) => {
  const { nome_usuario, senha_usuario, ...rest } = req.body;
  bcrypt.hash(senha_usuario, 10, (err, hash) => {
    if (err) throw err;
    const newItem = { ...rest, nome_usuario, senha_usuario: hash };

    const sql = 'INSERT INTO cadastros SET ?';
    db.query(sql, newItem, (error, results) => {
      if (error) throw error;
      res.send({ message: 'Usuário registrado com sucesso', results });
    });
  });
});

// Route to update a user
app.put('/cadastros/:id_usuario', (req, res) => {
  const sql = 'UPDATE cadastros SET ? WHERE id_usuario = ?';
  const id_usuario = req.params.id_usuario;
  const updatedItem = req.body;
  db.query(sql, [updatedItem, id_usuario], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Route to delete a user
app.delete('/cadastros/:id_usuario', (req, res) => {
  const sql = 'DELETE FROM cadastros WHERE id_usuario = ?';
  const id_usuario = req.params.id_usuario;
  db.query(sql, id_usuario, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Protected route to get user profile
app.get('/cadastros', authenticateToken, (req, res) => {
  const id_usuario = req.user.id_usuario;
  db.query('SELECT * FROM cadastros WHERE id_usuario = ?', [id_usuario], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results[0]);
  });
});

// CRUD routes for 'ficha'
// Rota para obter todas as fichas
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

app.get('/ficha/:id_ficha', (req, res) => {
  const sql = 'SELECT * FROM ficha WHERE id_ficha = ?';
  const id_ficha = req.params.id_ficha;
  console.log(`Recebido pedido para id_ficha: ${id_ficha}`);
  db.query(sql, [id_ficha], (error, results) => {
    if (error) {
      console.error(`Erro ao buscar ficha com id ${id_ficha}:`, error);
      res.status(500).send('Erro ao buscar ficha');
      return;
    }
    if (results.length > 0) {
      console.log(`Ficha encontrada: ${JSON.stringify(results[0])}`);
      res.send(results[0]);
    } else {
      console.log(`Ficha com id ${id_ficha} não encontrada`);
      res.status(404).send('Ficha não encontrada');
    }
  });
});


app.put('/ficha/:id_ficha', (req, res) => {
  const sql = 'UPDATE ficha SET ? WHERE id_ficha = ?';
  const id_ficha = req.params.id_ficha;
  const updatedItem = req.body;
  db.query(sql, [updatedItem, id_ficha], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

app.delete('/ficha/:id_ficha', (req, res) => {
  const sql = 'DELETE FROM ficha WHERE id_ficha = ?';
  const id_ficha = req.params.id_ficha;

  db.query(sql, [id_ficha], (error, results) => {
    if (error) {
      console.error(`Erro ao deletar ficha com id ${id_ficha}:`, error);
      res.status(500).send('Erro ao deletar ficha');
      return;
    }
    
    if (results.affectedRows > 0) {
      console.log(`Ficha com id ${id_ficha} deletada com sucesso`);
      res.send({ message: 'Ficha deletada com sucesso' });
    } else {
      console.log(`Ficha com id ${id_ficha} não encontrada`);
      res.status(404).send('Ficha não encontrada');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
