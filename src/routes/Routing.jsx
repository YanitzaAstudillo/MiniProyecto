import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Inicio from '../pages/Inicio';


function Routing() {


  return (
    <div>
      <Router>
        <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/inicio" element={<Inicio/>}/>
                <Route path="/" element={<Inicio/>}/>
                            
        </Routes>
      </Router>
    </div>
  );
}
export default Routing