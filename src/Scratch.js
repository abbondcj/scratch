import React from "react";
import { Routes, Route } from 'react-router-dom'
import { Home } from "./components/Home";
import { Login } from "./components/auth/Login";
import './App.css'

export const Scratch = () => {
  return (
    <div className="App">
      <h1>Scratch</h1>
      <Routes>
        <Route path="*" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

