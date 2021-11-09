import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import partial from 'shared/utils/partial';
import { NEW_VEHICLES_KEY, USED_VEHICLES_KEY, VEHICLE_TYPE_KEY } from 'Vehicle/Catalog/utils/constants';
import CatalogContext from 'Vehicle/Catalog/Context';

import Tab from './Tab';
import SellVehicleButton from './SellVehicleButton';
import Checkbox from './Checkbox';
import LocationFilter from './LocationFilter';
import BrandFilter from './BrandFilter';
import ModelFilter from './ModelFilter';
import YearFilter from './YearFilter';
import PriceFilter from './PriceFilter';
import VersionFilter from './VersionFilter';
import styles from './styles.module.scss';

const CARS_TAB = 'carros';
const MOTORCYCLES_TAB = 'motos';

export default function Filters() {
  const {
    filters,
    updateFilter,
    clearFilters,
    searchVehicles,
  } = useContext(CatalogContext);

  const isActive = (tabName) => filters[VEHICLE_TYPE_KEY] === tabName;
  const onChangeTab = partial(updateFilter, VEHICLE_TYPE_KEY);

  const isNewVehiclesChecked = !!filters[NEW_VEHICLES_KEY];
  const onToggleNewVehicles = partial(updateFilter, NEW_VEHICLES_KEY);

  const isUsedVehiclesChecked = !!filters[USED_VEHICLES_KEY];
  const onToggleUsedVehicles = partial(updateFilter, USED_VEHICLES_KEY);

  return (
    <div className={styles.filters}>
      <div className={styles.header}>
        <div className={styles.tabs} role="tablist">
          <Tab
            name={CARS_TAB}
            icon="car"
            onClick={onChangeTab}
            isActive={isActive(CARS_TAB)}
          />
          <Tab
            name={MOTORCYCLES_TAB}
            icon="motorcycle"
            onClick={onChangeTab}
            isActive={isActive(MOTORCYCLES_TAB)}
          />
        </div>

        <SellVehicleButton />
      </div>
      <div className={styles.filtersPanel} role="tabpanel">
        <div className={styles.filters}>
          <div className={styles.vehicleCondition}>
            <Checkbox
              label="Novos"
              isChecked={isNewVehiclesChecked}
              onToggle={onToggleNewVehicles}
            />
            <Checkbox
              label="Usados"
              isChecked={isUsedVehiclesChecked}
              onToggle={onToggleUsedVehicles}
            />
          </div>
          <LocationFilter />
          <BrandFilter />
          <ModelFilter />
          <YearFilter />
          <PriceFilter />
          <VersionFilter />
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.advancedSearch}>
            <FontAwesomeIcon className={styles.chevronIcon} icon="chevron-right" />
            Busca Avançada
          </button>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={clearFilters}
              className={styles.clearFilters}
            >
              Limpar filtros
            </button>
            <button
              type="button"
              onClick={searchVehicles}
              className={styles.search}
            >
              VER OFERTAS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
