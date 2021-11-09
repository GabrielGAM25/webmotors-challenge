import React, { useContext } from 'react';

import Select from 'shared/components/Select';
import get from 'shared/utils/get';
import partial from 'shared/utils/partial';
import { PRICE_KEY, prices } from 'Vehicle/Catalog/utils/constants';
import CatalogContext from 'Vehicle/Catalog/Context';

import styles from './styles.module.scss';

export default function PriceFilter() {
  const { filters, updateFilter } = useContext(CatalogContext);

  const handlePriceChange = (newPrice) => updateFilter(
    PRICE_KEY,
    {
      id: get('id', newPrice),
      min: get('min', newPrice),
      max: get('max', newPrice),
    },
  );

  const selectedPrice = prices.find(({ id }) => id === get('id', filters[PRICE_KEY]));

  return (
    <Select
      onChange={handlePriceChange}
      className={styles.priceSelect}
      options={prices}
      value={selectedPrice || null}
      getOptionValue={partial(get, 'id')}
      isSearchable={false}
      components={selectedPrice && { DropdownIndicator: null }}
      isClearable
      placeholder="Faixa de Preço"
    />
  );
}
