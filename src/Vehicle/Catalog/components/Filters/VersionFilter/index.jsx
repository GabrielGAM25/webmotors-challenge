import React, { useContext, useEffect, useState } from 'react';

import Select from 'shared/components/Select';
import partial from 'shared/utils/partial';
import get from 'shared/utils/get';
import { MODEL_ID_KEY, VERSION_ID_KEY, allVersionsOption } from 'Vehicle/Catalog/utils/constants';
import CatalogContext from 'Vehicle/Catalog/Context';
import fetchVersions from 'Version/api/fetch';

import styles from './styles.module.scss';

export default function VersionFilter() {
  const [versions, setVersions] = useState([allVersionsOption]);

  const { filters, updateFilter } = useContext(CatalogContext);

  const handleVersionChange = (newVersion) => updateFilter(VERSION_ID_KEY, get('id', newVersion));

  const selectedVersion = versions.find(({ id }) => id === filters[VERSION_ID_KEY]);

  useEffect(() => {
    if (filters[MODEL_ID_KEY]) {
      fetchVersions(filters[MODEL_ID_KEY])
        .then((newVersions) => setVersions([allVersionsOption, ...newVersions]));
    } else {
      selectedVersion && handleVersionChange(allVersionsOption);
      setVersions([allVersionsOption]);
    }
  }, [filters[MODEL_ID_KEY]]);

  return (
    <Select
      onChange={handleVersionChange}
      className={styles.versionSelect}
      options={versions}
      value={selectedVersion}
      getOptionValue={partial(get, 'id')}
      getOptionLabel={partial(get, 'name')}
      placeholder={null}
      isSearchable={false}
      label="Versão:"
      defaultValue={allVersionsOption}
    />
  );
}
