/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Usuário criado com sucesso!');
        router.push('/login');  // Redireciona para a página de login
      } else {
        setError('Erro ao criar usuário');
      }
    } catch (err) {
      setError('Erro ao conectar ao servidor');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Cadastrar</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite seu nome"
          className="mb-4 w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          className="mb-4 w-full px-4 py-2 border rounded-lg"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          className="mb-6 w-full px-4 py-2 border rounded-lg"
        />

        <button
          onClick={handleRegister}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
        >
          Cadastrar
        </button>

        <div className="text-center mt-4">
          <a href="/login" className="text-blue-500 hover:underline">
            Já tem uma conta? Entrar
          </a>
        </div>
      </div>
    </div>
  );
}
