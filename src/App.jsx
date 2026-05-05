import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import { Navigate } from "react-router-dom"
import './App.css';
import Landing from './pages/Landing';
import Signup from './userAuth/Signup';
import Signin from './userAuth/Signin';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import AdminProducts from './pages/AdminProducts';
import UserDashboard from './pages/UserDashboard';
import UserRevenue from './pages/UserRevenue';
import UserProfilePage from './pages/UserProfilePage';
import AdminProfilePage from './pages/AdminProfilePage';
import AdminEditprofile from './pages/AdminEditprofile';
import AdminUsers from './pages/AdminUsers';
import AdminCategories from './pages/AdminCategories';
import ForgotPassword from './userAuth/ForgotPassword';
import UserEditProfile from './pages/UserEditprofile';



const App = () => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const AdminRoute = ({ children }) => {
    return token && role === 'admin' ? children : <Navigate to="/signin" />;
  };

  const UserRoute = ({ children }) => {
    return token ? children : <Navigate to="/signin" />;
  };
  
  return (
    
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
        <Route path="/admin/profilePage" element={<AdminRoute><AdminProfilePage /></AdminRoute>} />
        <Route path="/admin/editprofile" element={<AdminRoute><AdminEditprofile /></AdminRoute>} />
        <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><AdminCategories /></AdminRoute>} />

        <Route path="/user/dashboard" element={<UserRoute><UserDashboard /></UserRoute>} />
        <Route path="/user/revenue" element={<UserRoute><UserRevenue /></UserRoute>} />
        <Route path="/user/editprofile" element={<UserRoute><UserEditProfile /></UserRoute>} />
        <Route path="/user/profilePage" element={<UserRoute><UserProfilePage /></UserRoute>} />
        
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
  
  );
};

export default App;
