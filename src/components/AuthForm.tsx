import React, { useState } from 'react';
import { Button } from './Button';
import { Input } from './Input';

type AuthFormProps = {
  isLogin?: boolean;
  onSubmit: (data: any) => void;
  error?: string;
};

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin = false, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!isLogin) {
      if (!formData.firstName) newErrors.firstName = 'Имя обязательно';
      if (!formData.lastName) newErrors.lastName = 'Фамилия обязательна';
      if (!formData.phone) newErrors.phone = 'Телефон обязателен';
      else if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
        newErrors.phone = 'Неверный формат телефона';
      }
    }

    if (!formData.email) newErrors.email = 'Email обязателен';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Неверный формат email';
    }

    if (!formData.password) newErrors.password = 'Пароль обязателен';
    else if (formData.password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(isLogin ? {
        email: formData.email,
        password: formData.password
      } : formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {!isLogin && (
        <>
          <div className="mb-4">
            <Input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              placeholder="Имя"
              error={errors.firstName}
            />
          </div>
          <div className="mb-4">
            <Input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              placeholder="Фамилия"
              error={errors.lastName}
            />
          </div>
          <div className="mb-4">
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="Телефон"
              error={errors.phone}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">
              <input
                type="radio"
                name="role"
                checked={formData.role === 'user'}
                onChange={() => setFormData({...formData, role: 'user'})}
              /> Пользователь
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                name="role"
                checked={formData.role === 'admin'}
                onChange={() => setFormData({...formData, role: 'admin'})}
              /> Администратор
            </label>
          </div>
        </>
      )}

      <div className="mb-4">
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          placeholder="Email"
          error={errors.email}
        />
      </div>
      <div className="mb-4">
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData({...formData, password: e.target.value})}
          placeholder="Пароль"
          error={errors.password}
        />
      </div>

      <Button type="submit" color="primary" size="large" title={isLogin ? 'Войти' : 'Зарегистрироваться'} />
    </form>
  );
};