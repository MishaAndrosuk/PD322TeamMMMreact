import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/authPage/login/Login.jsx';
import Register from './pages/authPage/register/Register.jsx';
import MainPage from './pages/mainPage/mainPage.jsx';

function App() {
  return (
    <GoogleOAuthProvider clientId="47235399203-5dbvs4krmn7oao0p2fk1102dpam9vgsb.apps.googleusercontent.com">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
