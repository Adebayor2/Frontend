import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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



const App = () => {
  let token = localStorage.getItem('token');
  let role = localStorage.getItem('role');
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin/dashboard" element= { token || role ? <AdminDashboard />:<Navigate to="/signin" /> } />
        <Route path="/admin/products" element={ token || role ? <AdminProducts />:<Navigate to="/signin" /> } />
        <Route path="/user/dashboard" element={ token ? <UserDashboard /> :<Navigate to="/signin" /> } />
        <Route path="/user/revenue" element={ token ? <UserRevenue /> :<Navigate to="/signin" /> } />
        <Route path="/user/profilePage" element={ token ? <UserProfilePage /> :<Navigate to="/signin" /> } />
        <Route path="/admin/profilePage" element={ token ? <AdminProfilePage /> :<Navigate to="/signin" /> } />
        <Route path="/admin/editprofile" element={ token ? <AdminEditprofile /> : <Navigate to="/signin" /> } />
        <Route path="/admin/users" element={ token ? <AdminUsers /> : <Navigate to="/signin" /> } />
        <Route path="/admin/categories" element={ token ? <AdminCategories /> : <Navigate to="/signin" /> } />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
