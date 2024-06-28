import './App.css';
import './assets/style.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './frontend/Home';
import Header from './frontend/includes/Header';
import Login from './frontend/Login';
import ChangePassword from './frontend/changepassword';
import Registration from './frontend/Registration';
import Logout from './frontend/Logout';


//admin
import HomePage from './components/admin/homepage';
import ManageUserPage from './components/admin/manageuser';
import ManageStudentPage from './components/admin/managestudent';
import ManageStrandPage from './components/admin/managestrand';
import ManageSectionPage from './components/admin/managesection';
import ManageEnlistPage from './components/admin/manageenlist';



//staff
import Homepagestaff from './components/staff/homepagestaff';










function App() {
  const [cart, setCart] = useState(0);
  let user = JSON.parse(localStorage.getItem('user-info'));
  let userId = user ? user.id : '';

  function userUpdate() {
    user = JSON.parse(localStorage.getItem('user-info'));
    userId = user ? user.id : '';
  }

  useEffect(() => {
    // cartItems();
  }, []);

  async function cartItems() {
    let result = await fetch('http://127.0.0.1:8000/api/cartitem/' + userId);
    result = await result.json();
    setCart(result);
  }

  function emptyCart() {
    setCart(0);
  }

  return (
    <BrowserRouter>
      <Header items={cart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login userUpdate={userUpdate} cartItem={cartItems} />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/changepassword" element={<ChangePassword />} />


      {/* admin */}
        <Route path="/manageuser" element={<ManageUserPage />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/admin" element={<HomePage />} />
        <Route path="/managestudent" element={<ManageStudentPage />} />
        <Route path="/managestrand" element={<ManageStrandPage />} />
        <Route path="/managesection" element={<ManageSectionPage />} />
        <Route path="/manageenlist" element={<ManageEnlistPage />} />
   

      {/* staff */}
        <Route path="/staff" element={<Homepagestaff />} />
      




      

      </Routes>
    </BrowserRouter>
  );
}

export default App;
