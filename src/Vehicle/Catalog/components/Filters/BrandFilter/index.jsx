import React, { useCallback, useContext, useState } from 'react';

import useAsyncEffect from 'shared/hooks/useAsyncEffect';
import Select from 'shared/components/Select';
import partial from 'shared/utils/partial';
import get from 'shared/utils/get';
import { BRAND_ID_KEY, allBrandsOption } from 'Vehicle/Catalog/utils/constants';
import CatalogContext from 'Vehicle/Catalog/Context';
import fetchBrands from 'Brand/api/fetch';

import styles from './styles.module.scss';

export default function BrandFilter() {
  const [brands, setBrands] = useState([allBrandsOption]);

  const onFetchBrands = useCallback((newBrands) => setBrands([allBrandsOption, ...newBrands]), []);

  useAsyncEffect(fetchBrands, onFetchBrands, []);

  const { filters, updateFilter } = useContext(CatalogContext);

  const handleBrandChange = (newBrand) => updateFilter(BRAND_ID_KEY, get('id', newBrand));

  const selectedBrand = brands.find(({ id }) => id === filters[BRAND_ID_KEY]);

  return (
    <Select
      onChange={handleBrandChange}
      className={styles.brandSelect}
      options={brands}
      value={selectedBrand || allBrandsOption}
      getOptionValue={partial(get, 'id')}
      getOptionLabel={partial(get, 'name')}
      placeholder={null}
      isSearchable={false}
      label="Marca:"
      defaultValue={allBrandsOption}
    />
  );
}
