import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Select from 'shared/components/Select';
import partial from 'shared/utils/partial';
import get from 'shared/utils/get';
import {
  radiusOptions,
  cities,
  CITY_ID_KEY,
  RADIUS_KEY,
} from 'Vehicle/Catalog/utils/constants';
import CatalogContext from 'Vehicle/Catalog/Context';

import { citySelectStyles, radiusSelectStyles } from './selectStyles';
import styles from './styles.module.scss';

export default function LocationFilter() {
  const { filters, updateFilter } = useContext(CatalogContext);

  const handleCityChange = (newCity) => updateFilter(CITY_ID_KEY, get('id', newCity));
  const handleRadiusChange = (newRadius) => updateFilter(RADIUS_KEY, get('value', newRadius));

  const selectedCity = cities.find(({ id }) => id === filters[CITY_ID_KEY]);
  const selectedRadius = radiusOptions.find(({ value }) => value === filters[RADIUS_KEY]);

  const citySelectLabel = (
    <>
      <FontAwesomeIcon className={styles.mapMarkerIcon} icon="map-marker-alt" />
      Onde:
    </>
  );

  return (
    <div className={styles.locationFilter}>
      <Select
        onChange={handleCityChange}
        className={styles.citySelect}
        styles={citySelectStyles}
        options={cities}
        value={selectedCity || null}
        getOptionValue={partial(get, 'id')}
        getOptionLabel={partial(get, 'name')}
        placeholder={null}
        components={selectedCity && { DropdownIndicator: null }}
        isClearable
        label={citySelectLabel}
      />
      <Select
        onChange={handleRadiusChange}
        className={styles.radiusSelect}
        styles={radiusSelectStyles}
        options={radiusOptions}
        value={selectedRadius || null}
        placeholder={null}
        isSearchable={false}
        label="Raio:"
      />
    </div>
  );
}
