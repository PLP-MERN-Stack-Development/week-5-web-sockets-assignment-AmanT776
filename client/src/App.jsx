import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RoomList from './pages/RoomList';
import ChatRoom from './pages/ChatRoom';
import ProtectedRoute from './utils/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/login'/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/rooms" element={<ProtectedRoute><RoomList/></ProtectedRoute>} />
      <Route path="/room/:roomId" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />
      {/* <Route path="*" element={<Navigate to="/login" />} /> */}
    </Routes>
  );
};

export default App;