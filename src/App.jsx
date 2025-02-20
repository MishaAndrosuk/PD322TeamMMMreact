import './App.css';
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Login from './pages/authPage/login/Login.jsx';
import Register from './pages/authPage/register/Register.jsx';
import MainPage from './pages/mainPage/mainPage.jsx';
import CreateCoursePage from './pages/coursesPage/Create.jsx';
import EditCoursePage from './pages/coursesPage/Edit.jsx';
import CreateTopicPage from './pages/topicsPage/Create.jsx';
import EditTopicPage from './pages/topicsPage/Edit.jsx';
import CreateTestPage from './pages/testsPage/Create.jsx';
import EditTestPage from './pages/testsPage/Edit.jsx';
import NotFound from './pages/notFound/NotFound';
import DefaulLayout from './components/layout/DefaultLayout';
import ProfilePage from './pages/userPages/ProfilePage.jsx';
import EditProfilePage from './pages/userPages/EditProfilePage.jsx';

import { useAction } from './hooks/useAction.js';
import { useSelector } from "react-redux";

function App() {
  const { getMe } = useAction();
  const { isAuth } = useSelector((state) => state.userReducer);
  
  useEffect(() => {
    const fetchData = async () => {
      await getMe();
    };
    
    fetchData();
  }, []);


  return (
    <GoogleOAuthProvider clientId="47235399203-5dbvs4krmn7oao0p2fk1102dpam9vgsb.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<DefaulLayout />} >
          <Route index element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course/create" element={<CreateCoursePage />} />
          <Route path="/course/edit/:courseId" element={<EditCoursePage />} />
          <Route path="/topic/create/:courseId" element={<CreateTopicPage />} />
          <Route path="/topic/create" element={<CreateTopicPage />} />
          <Route path="/topic/edit/:topicId" element={<EditTopicPage />} />
          <Route path="/test/create" element={<CreateTestPage />} />
          <Route path="/test/edit/:testId" element={<EditTestPage />} />
          {isAuth && (
            <>
              <Route path="/user/profile" element={<ProfilePage />}/>
              <Route path="/user/profile/edit" element={<EditProfilePage />}/>
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
