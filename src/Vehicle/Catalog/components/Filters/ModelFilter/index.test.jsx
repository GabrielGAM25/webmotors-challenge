import { cleanup, render, waitFor } from '@testing-library/react';
import React from 'react';
import selectEvent from 'react-select-event';

import fetchModels from 'Model/api/fetch';
import CatalogContext from 'Vehicle/Catalog/Context';
import { MODEL_ID_KEY, allModelsOption, BRAND_ID_KEY } from 'Vehicle/Catalog/utils/constants';

import ModelFilter from '.';

jest.mock('Model/api/fetch');

const defaultProps = {
  filters: {},
  updateFilter: jest.fn(),
};

const setup = (props, renderer = render) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  renderer(
    <CatalogContext.Provider value={{ ...defaultProps, ...props }}>
      <ModelFilter />
    </CatalogContext.Provider>,
  )
);

afterEach(() => cleanup());

const models = [
  { id: 1, name: 'Agile' },
  { id: 2, name: 'Astra' },
  { id: 3, name: 'Onix' },
];

beforeEach(() => {
  fetchModels.mockResolvedValueOnce(models);
});

const brandFilter = { [BRAND_ID_KEY]: 1 };

test('set the allModelsOption as the default option', async () => {
  const container = setup();

  const defaultOption = container.getByText(allModelsOption.name);

  await waitFor(() => {
    expect(defaultOption).toBeInTheDocument();
  });
});

test('renders only the allModelsOption when no brand is selected', async () => {
  const container = setup();

  const modelSelect = container.getByText('Modelo:');
  selectEvent.openMenu(modelSelect);

  await waitFor(() => {
    models.forEach(({ name }) => {
      const option = container.queryByText(name);
      expect(option).not.toBeInTheDocument();
    });
  });
});

test('renders an option for each fetched model when a brand is selected', async () => {
  const container = setup({ filters: brandFilter });

  const modelSelect = container.getByText('Modelo:');
  selectEvent.openMenu(modelSelect);

  await waitFor(() => {
    models.forEach(({ name }) => {
      const option = container.getByText(name);
      expect(option).toBeInTheDocument();
    });
  });
});

test('controls the selected model with filters', async () => {
  const [firstModel, secondModel] = models;
  const container = setup({ filters: { [MODEL_ID_KEY]: firstModel.id, ...brandFilter } });

  await waitFor(() => {
    expect(container.getByText(firstModel.name)).toBeInTheDocument();
  });

  setup({ filters: { [MODEL_ID_KEY]: secondModel.id, ...brandFilter } }, container.rerender);

  expect(container.getByText(secondModel.name)).toBeInTheDocument();
});

test('calls updateFilter on model selected', async () => {
  const container = setup({ filters: brandFilter });
  const modelSelect = container.getByText('Modelo:');

  const [{ id, name }] = models;
  await selectEvent.select(modelSelect, name);

  expect(defaultProps.updateFilter).toBeCalledTimes(1);
  expect(defaultProps.updateFilter).toBeCalledWith(MODEL_ID_KEY, id);
});
