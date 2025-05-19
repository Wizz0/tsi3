import React from 'react'
import { Link } from 'react-router-dom'

export const Header = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const handleLogout = () => {
    localStorage.removeItem('user')
    window.location.href = '/login' 
  }

  return (
    <div className="fixed top-0 w-full h-[100px] text-black" style={{ backgroundColor: '#8EE7BB' }}>
      <div className="flex w-[70%] m-auto">
        <div className="flex flex-col">
          {isAuthenticated ? (
            <>
              <Link to="/">Главная</Link>
              <Link to="/about">О нас</Link>
              <button onClick={handleLogout}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login">Вход</Link>
              <Link to="/register">Регистрация</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header