/* eslint-disable @typescript-eslint/no-require-imports */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./authMiddleware'); // Importando o middleware de autenticação

// Carregar variáveis de ambiente do arquivo .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const secretKey = process.env.JWT_SECRET || 'supersecretkey';
const saltRounds = 10; // Número de rounds para gerar o salt do bcrypt

// Configurar CORS para permitir todas as origens
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Habilitar o uso de cookies
app.use(cookieParser());

// Middleware para parsear o corpo da requisição
app.use(bodyParser.json());

// Configurar o pool de conexões com o PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Rota de registro de usuário com criptografia de senha usando bcrypt
app.post('/register', async (req, res) => {
  const { name, email, password, type = 'client' } = req.body;

  console.log('Recebendo dados do usuário:', { name, email, password, type });

  try {
    // Verificar se o email já foi registrado
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Criptografar a senha com bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar novo usuário no banco de dados
    await pool.query(
      'INSERT INTO users (name, email, password, type) VALUES ($1, $2, $3, $4)',
      [name, email, hashedPassword, type]
    );

    res.status(201).json({ message: 'Usuário criado com sucesso' });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota de login com autenticação usando bcrypt e JWT
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o email existe
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    const user = result.rows[0];

    // Verificar a senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user.id, type: user.type }, secretKey, { expiresIn: '1h' });

    // Enviar o token no cookie
    res.cookie('token', token, {
      httpOnly: true, // O cookie não pode ser acessado via JavaScript (XSS prevention)
      secure: process.env.NODE_ENV === 'production', // Enviar apenas via HTTPS em produção
      maxAge: 3600000, // 1 hora
    });

    res.json({ message: 'Login bem-sucedido' });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Rota protegida (exemplo) que só pode ser acessada por usuários autenticados
app.get('/dashboard', authMiddleware, (req, res) => {
  res.json({ message: `Bem-vindo(a), usuário ${req.user.userId}! Tipo de usuário: ${req.user.type}` });
});

// Rota para logout (remover o cookie com o token JWT)
app.post('/logout', (req, res) => {
  res.clearCookie('token'); // Limpa o cookie do token JWT
  res.json({ message: 'Logout bem-sucedido' });
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
