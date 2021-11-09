import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Catalog from './Catalog';

export default function VehicleRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Catalog />} />
    </Routes>
  );
}
