import React, { useState } from 'react';
import { Container } from '../components/Container';
import { AuthForm } from '../components/AuthForm';
import { useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (userData: any) => {
    const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.error || 'Ошибка регистрации');
    }

    navigate('/login');
  };

  return (
    <Container>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Регистрация</h2>
          <AuthForm onSubmit={handleRegister} error={error} />
          <p className="mt-4 text-center">
            Уже есть аккаунт? <a href="/login" className="text-amber-700">Войдите</a>
          </p>
        </div>
      </div>
    </Container>
  );
};