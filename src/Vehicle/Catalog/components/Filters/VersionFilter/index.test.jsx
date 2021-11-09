import { cleanup, render, waitFor } from '@testing-library/react';
import React from 'react';
import selectEvent from 'react-select-event';

import fetchVersions from 'Version/api/fetch';
import CatalogContext from 'Vehicle/Catalog/Context';
import { MODEL_ID_KEY, VERSION_ID_KEY, allVersionsOption } from 'Vehicle/Catalog/utils/constants';

import VersionFilter from '.';

jest.mock('Version/api/fetch');

const defaultProps = {
  filters: {},
  updateFilter: jest.fn(),
};

const setup = (props, renderer = render) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  renderer(
    <CatalogContext.Provider value={{ ...defaultProps, ...props }}>
      <VersionFilter />
    </CatalogContext.Provider>,
  )
);

afterEach(() => cleanup());

const versions = [
  { id: 1, name: '1.5 DX 16V FLEX 4P AUTOMÁTICO' },
  { id: 2, name: '1.5 LX 16V FLEX 4P MANUAL' },
  { id: 3, name: '1.8 16V EVO FLEX FREEDOM OPEN EDITION AUTOMÁTICO' },
  { id: 4, name: '1.0 MPI EL 8V FLEX 4P MANUAL' },
];

beforeEach(() => {
  fetchVersions.mockResolvedValueOnce(versions);
});

const modelFilter = { [MODEL_ID_KEY]: 1 };

test('set the allVersionsOption as the default option', async () => {
  const container = setup();

  const defaultOption = container.getByText(allVersionsOption.name);

  await waitFor(() => {
    expect(defaultOption).toBeInTheDocument();
  });
});

test('renders only the allVersionsOption when no model is selected', async () => {
  const container = setup();

  const versionSelect = container.getByText('Versão:');
  selectEvent.openMenu(versionSelect);

  await waitFor(() => {
    versions.forEach(({ name }) => {
      const option = container.queryByText(name);
      expect(option).not.toBeInTheDocument();
    });
  });
});

test('renders an option for each fetched version when a model is selected', async () => {
  const container = setup({ filters: modelFilter });

  const versionSelect = container.getByText('Versão:');
  selectEvent.openMenu(versionSelect);

  await waitFor(() => {
    versions.forEach(({ name }) => {
      const option = container.getByText(name);
      expect(option).toBeInTheDocument();
    });
  });
});

test('controls the selected version with filters', async () => {
  const [firstVersion, secondVersion] = versions;
  const container = setup({ filters: { [VERSION_ID_KEY]: firstVersion.id, ...modelFilter } });

  await waitFor(() => {
    expect(container.getByText(firstVersion.name)).toBeInTheDocument();
  });

  setup({ filters: { [VERSION_ID_KEY]: secondVersion.id, ...modelFilter } }, container.rerender);

  expect(container.getByText(secondVersion.name)).toBeInTheDocument();
});

test('calls updateFilter on version selected', async () => {
  const container = setup({ filters: modelFilter });
  const versionSelect = container.getByText('Versão:');

  const [{ id, name }] = versions;
  await selectEvent.select(versionSelect, name);

  expect(defaultProps.updateFilter).toBeCalledTimes(1);
  expect(defaultProps.updateFilter).toBeCalledWith(VERSION_ID_KEY, id);
});
