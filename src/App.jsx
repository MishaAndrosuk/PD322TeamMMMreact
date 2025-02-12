import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/authPage/login/Login.jsx';
import Register from './pages/authPage/register/Register.jsx';
import MainPage from './pages/mainPage/mainPage.jsx';
import CreateCoursePage from './pages/coursesPage/Create.jsx';
import UpdateCoursePage from './pages/coursesPage/Edit.jsx';
import CreateTopicPage from './pages/topicsPage/Create.jsx';
import UpdateTopicPage from './pages/topicsPage/Edit.jsx';
import CreateTestPage from './pages/testsPage/Create.jsx';
import UpdateTestPage from './pages/testsPage/Edit.jsx';

function App() {
  return (
    <GoogleOAuthProvider clientId="47235399203-5dbvs4krmn7oao0p2fk1102dpam9vgsb.apps.googleusercontent.com">
      <Routes>
        <Route path="/log" element={<Login />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/course/create" element={<CreateCoursePage />} />
        <Route path="/course/update" element={<UpdateCoursePage />} />
        <Route path="/topic/create" element={<CreateTopicPage />} />
        <Route path="/topic/update" element={<UpdateTopicPage />} />
        <Route path="/test/create" element={<CreateTestPage />} />
        <Route path="/test/update" element={<UpdateTestPage />} />

      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
