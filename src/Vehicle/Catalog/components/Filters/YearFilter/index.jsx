import React, { useContext } from 'react';

import Select from 'shared/components/Select';
import get from 'shared/utils/get';
import { YEAR_KEY, years } from 'Vehicle/Catalog/utils/constants';
import CatalogContext from 'Vehicle/Catalog/Context';

import styles from './styles.module.scss';

export default function YearFilter() {
  const { filters, updateFilter } = useContext(CatalogContext);

  const handleYearChange = (newYear) => updateFilter(YEAR_KEY, get('value', newYear));

  const selectedYear = years.find(({ value }) => value === filters[YEAR_KEY]);

  return (
    <Select
      onChange={handleYearChange}
      className={styles.yearSelect}
      options={years}
      value={selectedYear || null}
      placeholder={null}
      isSearchable={false}
      components={selectedYear && { DropdownIndicator: null }}
      isClearable
      label="Ano Desejado:"
    />
  );
}
