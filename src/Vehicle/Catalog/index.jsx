import React, { useState } from 'react';

import Filters from './components/Filters';
import CatalogContext from './Context';
import styles from './styles.module.scss';

export default function Catalog() {
  const [filters, setFilters] = useState({});

  const updateFilter = (key, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const clearFilters = () => setFilters({});

  const searchVehicles = () => console.log(filters);

  const contextValue = {
    filters,
    updateFilter,
    clearFilters,
    searchVehicles,
  };

  return (
    <CatalogContext.Provider value={contextValue}>
      <div className={styles.container}>
        <Filters />
      </div>
    </CatalogContext.Provider>
  );
}
