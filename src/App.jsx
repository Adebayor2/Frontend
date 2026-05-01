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
import UserProfile from './pages/UserProfile';

const App = () => {
  let token = localStorage.token
  let role = localStorage.role

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/admin/dashboard" element= { token || role ? <AdminDashboard />:<Navigate to="/signin" /> } />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/user/dashboard" element={ token ? <UserDashboard /> :<Navigate to="/signin" /> } />
        <Route path="/user/revenue" element={ token ? <UserRevenue /> :<Navigate to="/signin" /> } />
        <Route path="/user/profile" element={ token ? <UserProfile /> :<Navigate to="/signin" /> } />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
