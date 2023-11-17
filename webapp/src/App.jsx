import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Map from '../screens/Map';
import Authentication from '../screens/Authentication';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Map/>} />
        <Route exact path="/Authentication" element={<Authentication/>} />
      </Routes>
    </BrowserRouter>
  );
}
