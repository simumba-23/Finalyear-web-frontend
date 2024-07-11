import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PostModal from './pages/PostModal';
import LoginPage from './pages/LoginPage';
import Tooldetail from './pages/Tooldetail';
import Profile from './pages/Profile';
import Register from './pages/Register';
import PrivateRoute from './Utils/PrivateRoute';
import HomeNav from './Components/HomeNavbar';
import Requestscheduling from './pages/requestscheduling';
import Chat from './pages/chat';
import SearchBar from './Components/SearchBar';
import MyTool from './pages/MyTool';
import UserInfo from './pages/UserInfo';
import OwnerInfo from './pages/OwnerInfo';
import { ToolRequest } from './pages/ToolRequest';

function App() {
  return (
    <div className='App'>
      <HomeNav />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/userInfo' element={<UserInfo />} />
        <Route path='/OwnerInfo' element={<OwnerInfo />} />
        <Route path='/search' element={<SearchBar />} />
        <Route path='/post' element={<PostModal />} />
        <Route path='/myTools/' element={<MyTool />} />
        <Route path='/tooldetail/:id' element={<Tooldetail />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/Scheduling' element={<Requestscheduling />} />
        <Route path='/ToolRequest/' element={<ToolRequest />} />
        <Route path='/Chat' element={<Chat />} />
        {/* 404 route */}
      </Routes>
    </div>
  );
}

export default App;
