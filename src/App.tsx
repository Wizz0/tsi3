import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Footer from './components/Footer'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route 
            path="/" 
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/" /> : 
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
                <Navigate to="/" /> : 
                <RegisterPage />
            } 
          />
          <Route 
            path="/about" 
            element={
              isAuthenticated ? 
                <About /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/blog" 
            element={
              isAuthenticated ? 
                <Blog /> : 
                <Navigate to="/login" />
            } 
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App;
