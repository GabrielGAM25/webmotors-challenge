import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from 'shared/components/Header';

import VehicleRoutes from './Vehicle';

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/vehicles" />} />
        <Route path="/vehicles/*" element={<VehicleRoutes />} />
      </Routes>
    </>
  );
}
