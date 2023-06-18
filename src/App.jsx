import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Auth from './pages/Auth'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Cart from './pages/Cart'
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        
        <Route exact path="/" element={<Auth />} />
        <Route exact path="/Home" element={<Home />} />
        <Route exact path="/Listings" element={<Listings />} />
        <Route exact path="/Cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
