import React, { useContext, useEffect, useState } from 'react';

import Select from 'shared/components/Select';
import partial from 'shared/utils/partial';
import get from 'shared/utils/get';
import { BRAND_ID_KEY, MODEL_ID_KEY, allModelsOption } from 'Vehicle/Catalog/utils/constants';
import CatalogContext from 'Vehicle/Catalog/Context';
import fetchModels from 'Model/api/fetch';

import styles from './styles.module.scss';

export default function ModelFilter() {
  const [models, setModels] = useState([allModelsOption]);

  const { filters, updateFilter } = useContext(CatalogContext);

  const handleModelChange = (newModel) => updateFilter(MODEL_ID_KEY, get('id', newModel));

  const selectedModel = models.find(({ id }) => id === filters[MODEL_ID_KEY]);

  useEffect(() => {
    if (filters[BRAND_ID_KEY]) {
      fetchModels(filters[BRAND_ID_KEY])
        .then((newModels) => setModels([allModelsOption, ...newModels]));
    } else {
      selectedModel && handleModelChange(allModelsOption);
      setModels([allModelsOption]);
    }
  }, [filters[BRAND_ID_KEY]]);

  return (
    <Select
      onChange={handleModelChange}
      className={styles.modelSelect}
      options={models}
      value={selectedModel || allModelsOption}
      getOptionValue={partial(get, 'id')}
      getOptionLabel={partial(get, 'name')}
      placeholder={null}
      isSearchable={false}
      label="Modelo:"
      defaultValue={allModelsOption}
    />
  );
}
