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
import NotFound from './pages/notFound/NotFound';
import DefaulLayout from './components/layout/DefaultLayout';

function App() {
  return (
    <GoogleOAuthProvider clientId="47235399203-5dbvs4krmn7oao0p2fk1102dpam9vgsb.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<DefaulLayout />} >
          <Route index element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course/create" element={<CreateCoursePage />} />
          <Route path="/course/update/:id" element={<UpdateCoursePage />} />
          <Route path="/topic/create/:courseId" element={<CreateTopicPage />} />
          <Route path="/topic/create" element={<CreateTopicPage />} />
          <Route path="/topic/update/:id" element={<UpdateTopicPage />} />
          <Route path="/test/create/:id" element={<CreateTestPage />} />
          <Route path="/test/update/:id" element={<UpdateTestPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
