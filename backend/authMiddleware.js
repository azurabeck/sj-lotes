/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'supersecretkey';

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Por favor, faça login.' });
  }

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified; // Anexar os dados do usuário à requisição
    next(); // Passa para a próxima função
  } catch (err) {
    res.status(400).json({ message: 'Token inválido.' });
  }
};

module.exports = authMiddleware;
