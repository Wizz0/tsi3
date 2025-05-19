import React, { useState } from 'react';
import { Container } from '../components/Container';
import { AuthForm } from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage = ({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (credentials: { email: string; password: string }) => {
    const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
    
      const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Ошибка авторизации');
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    setIsAuthenticated(true)
    navigate('/');
  };

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Вход</h2>
          <AuthForm isLogin onSubmit={handleLogin} error={error} />
          <p className="mt-4 text-center">
            Нет аккаунта? <a href="/register" className="text-amber-700">Зарегистрируйтесь</a>
          </p>
        </div>
      </div>
    </Container>
  );
};