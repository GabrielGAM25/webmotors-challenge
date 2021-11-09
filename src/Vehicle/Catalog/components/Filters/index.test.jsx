/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  waitFor,
  within,
} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import selectEvent from 'react-select-event';

import fetchBrands from 'Brand/api/fetch';
import fetchModels from 'Model/api/fetch';
import fetchVersions from 'Version/api/fetch';
import {
  BRAND_ID_KEY,
  cities,
  CITY_ID_KEY,
  MODEL_ID_KEY,
  MOTORCYCLES_TAB,
  NEW_VEHICLES_KEY,
  prices,
  PRICE_KEY,
  radiusOptions,
  RADIUS_KEY,
  USED_VEHICLES_KEY,
  VEHICLE_TYPE_KEY,
  years,
  YEAR_KEY,
} from 'Vehicle/Catalog/utils/constants';
import CatalogContext from 'Vehicle/Catalog/Context';

import tabStyles from './Tab/styles.module.scss';
import Filters from '.';

jest.mock('Brand/api/fetch');
jest.mock('Model/api/fetch');
jest.mock('Version/api/fetch');

const defaultWrapperProps = {
  filters: {
    [NEW_VEHICLES_KEY]: false,
    [USED_VEHICLES_KEY]: false,
  },
  updateFilter: jest.fn(),
  clearFilters: jest.fn(),
  searchVehicles: jest.fn(),
};

const setup = (wrapperProps, renderer = render) => renderer((
  <BrowserRouter>
    <CatalogContext.Provider value={{ ...defaultWrapperProps, ...wrapperProps }}>
      <Filters />
    </CatalogContext.Provider>
  </BrowserRouter>
));

afterEach(() => cleanup());
afterEach(() => jest.clearAllMocks());

const brands = [
  { id: 1, name: 'Chevrolet' },
  { id: 2, name: 'Honda' },
  { id: 3, name: 'Ford' },
];

const models = [
  { id: 1, name: 'Agile' },
  { id: 2, name: 'Astra' },
  { id: 3, name: 'Onix' },
];

const versions = [
  { id: 1, name: '1.5 DX 16V FLEX 4P AUTOMÁTICO' },
  { id: 2, name: '1.5 LX 16V FLEX 4P MANUAL' },
  { id: 3, name: '1.8 16V EVO FLEX FREEDOM OPEN EDITION AUTOMÁTICO' },
  { id: 4, name: '1.0 MPI EL 8V FLEX 4P MANUAL' },
];

beforeEach(() => {
  fetchBrands.mockResolvedValue(brands);
  fetchModels.mockResolvedValue(brands);
  fetchVersions.mockResolvedValue(brands);
});

test('renders the tabs for vehicle types', async () => {
  const container = setup();
  const tabsList = container.getByRole('tablist');
  const tabs = within(tabsList).getAllByRole('tab');

  await waitFor(() => {
    expect(tabs[0].textContent).toEqual('COMPRARCARROS');
    expect(tabs[1].textContent).toEqual('COMPRARMOTOS');
  });
});

test('set the car tab as active by default', async () => {
  const container = setup();
  const tabsList = container.getByRole('tablist');
  const [carTab, motorcycleTab] = within(tabsList).getAllByRole('tab');

  await waitFor(() => {
    expect(carTab).toHaveClass(tabStyles.active);
    expect(motorcycleTab).not.toHaveClass(tabStyles.active);
  });
});

test('calls updateFilter on tab click', async () => {
  const container = setup();
  const tabsList = container.getByRole('tablist');
  const motorcycleTab = within(tabsList).getAllByRole('tab')[1];

  fireEvent.click(motorcycleTab);

  await waitFor(() => {
    expect(defaultWrapperProps.updateFilter).toBeCalledTimes(1);
    expect(defaultWrapperProps.updateFilter).toBeCalledWith(VEHICLE_TYPE_KEY, MOTORCYCLES_TAB);
  });
});

test('renders a link to the vehicles selling page', async () => {
  const container = setup();

  const link = container.getByRole('link');
  fireEvent.click(link);

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/sell');
  });
});

test('renders a checkbox to filter by new vehicles', async () => {
  const container = setup();

  const newVehiclesLabel = container.getByLabelText('Novos');
  const newVehiclesCheckbox = container.getAllByRole('checkbox')[0];

  await waitFor(() => {
    expect(newVehiclesLabel).toBeInTheDocument();
    expect(newVehiclesCheckbox).toBeInTheDocument();
  });
});

test('controls the new vehicles checkbox using the filter props', async () => {
  const container = setup({ filters: { [NEW_VEHICLES_KEY]: false } });
  const newVehiclesCheckbox = container.getAllByRole('checkbox')[0];

  await waitFor(() => {
    expect(newVehiclesCheckbox).not.toBeChecked();
  });

  setup({ filters: { [NEW_VEHICLES_KEY]: true } }, container.rerender);

  expect(newVehiclesCheckbox).toBeChecked();
});

test('calls updateFilter on new vechicles filter toggle', async () => {
  const container = setup({ filters: { [NEW_VEHICLES_KEY]: false } });
  const newVehiclesCheckbox = container.getAllByRole('checkbox')[0];

  fireEvent.click(newVehiclesCheckbox);

  await waitFor(() => {
    expect(defaultWrapperProps.updateFilter).toHaveBeenLastCalledWith(NEW_VEHICLES_KEY, true);
  });

  setup({ filters: { [NEW_VEHICLES_KEY]: true } }, container.rerender);

  fireEvent.click(newVehiclesCheckbox);
  expect(defaultWrapperProps.updateFilter).toHaveBeenLastCalledWith(NEW_VEHICLES_KEY, false);
});

test('renders a checkbox to filter by used vehicles', async () => {
  const container = setup();

  const usedVehiclesLabel = container.getByLabelText('Usados');
  const usedVehiclesCheckbox = container.getAllByRole('checkbox')[1];

  await waitFor(() => {
    expect(usedVehiclesLabel).toBeInTheDocument();
    expect(usedVehiclesCheckbox).toBeInTheDocument();
  });
});

test('controls the used vehicles checkbox using the filter props', async () => {
  const container = setup({ filters: { [USED_VEHICLES_KEY]: false } });
  const usedVehiclesCheckbox = container.getAllByRole('checkbox')[1];

  await waitFor(() => {
    expect(usedVehiclesCheckbox).not.toBeChecked();
  });

  setup({ filters: { [USED_VEHICLES_KEY]: true } }, container.rerender);

  expect(usedVehiclesCheckbox).toBeChecked();
});

test('calls updateFilter on used vechicles filter toggle', async () => {
  const container = setup({ filters: { [USED_VEHICLES_KEY]: false } });
  const usedVehiclesCheckbox = container.getAllByRole('checkbox')[1];

  fireEvent.click(usedVehiclesCheckbox);

  await waitFor(() => {
    expect(defaultWrapperProps.updateFilter).toHaveBeenLastCalledWith(USED_VEHICLES_KEY, true);
  });

  setup({ filters: { [USED_VEHICLES_KEY]: true } }, container.rerender);

  fireEvent.click(usedVehiclesCheckbox);
  expect(defaultWrapperProps.updateFilter).toHaveBeenLastCalledWith(USED_VEHICLES_KEY, false);
});

test('controls the selected city with filters', async () => {
  const [firstCity, secondCity] = cities;
  const container = setup({ filters: { [CITY_ID_KEY]: firstCity.id } });

  await waitFor(() => {
    expect(container.getByText(firstCity.name)).toBeInTheDocument();
  });

  setup({ filters: { [CITY_ID_KEY]: secondCity.id } }, container.rerender);

  expect(container.getByText(secondCity.name)).toBeInTheDocument();
});

test('calls updateFilter on used city changed', async () => {
  const container = setup();
  const citySelect = container.getByText('Onde:');

  const [city] = cities;
  await selectEvent.select(citySelect, city.name);

  await waitFor(() => {
    expect(defaultWrapperProps.updateFilter).toBeCalledTimes(1);
    expect(defaultWrapperProps.updateFilter).toBeCalledWith(CITY_ID_KEY, city.id);
  });
});

test('controls the selected radius with filters', async () => {
  const [firstRadius, secondRadius] = radiusOptions;
  const container = setup({ filters: { [RADIUS_KEY]: firstRadius.value } });

  await waitFor(() => {
    expect(container.getByText(firstRadius.label)).toBeInTheDocument();
  });

  setup({ filters: { [RADIUS_KEY]: secondRadius.value } }, container.rerender);

  expect(container.getByText(secondRadius.label)).toBeInTheDocument();
});

test('calls updateFilter on radius selected', async () => {
  const container = setup();
  const radiusSelect = container.getByText('Raio:');

  const [radius] = radiusOptions;
  await selectEvent.select(radiusSelect, radius.label);

  await waitFor(() => {
    expect(defaultWrapperProps.updateFilter).toBeCalledTimes(1);
    expect(defaultWrapperProps.updateFilter).toBeCalledWith(RADIUS_KEY, radius.value);
  });
});

test('controls the selected brand with filters', async () => {
  const [firstBrand, secondBrand] = brands;
  const container = setup({ filters: { [BRAND_ID_KEY]: firstBrand.id } });

  await waitFor(() => {
    expect(container.getByText(firstBrand.name)).toBeInTheDocument();
  });

  setup({ filters: { [BRAND_ID_KEY]: secondBrand.id } }, container.rerender);

  await waitFor(() => {
    expect(container.getByText(secondBrand.name)).toBeInTheDocument();
  });
});

test('calls updateFilter on brand selected', async () => {
  const container = setup();
  const brandSelect = container.getByText('Marca:');

  const [{ id, name }] = brands;
  await selectEvent.select(brandSelect, name);

  await waitFor(() => {
    expect(defaultWrapperProps.updateFilter).toBeCalledTimes(1);
    expect(defaultWrapperProps.updateFilter).toBeCalledWith(BRAND_ID_KEY, id);
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
  fetchModels.mockResolvedValue(models);
  const container = setup({ filters: { [BRAND_ID_KEY]: 1 } });

  const modelSelect = container.getByText('Modelo:');
  selectEvent.openMenu(modelSelect);

  await waitFor(() => {
    models.forEach(({ name }) => {
      const option = container.getByText(name);
      expect(option).toBeInTheDocument();
    });
  });
});

test('controls the selected year with filters', async () => {
  const [firstYear, secondYear] = years;
  const container = setup({ filters: { [YEAR_KEY]: firstYear.value } });

  await waitFor(() => {
    expect(container.getByText(firstYear.label)).toBeInTheDocument();
  });

  setup({ filters: { [YEAR_KEY]: secondYear.value } }, container.rerender);

  expect(container.getByText(secondYear.label)).toBeInTheDocument();
});

test('calls updateFilter on year selected', async () => {
  const container = setup();
  const yearSelect = container.getByText('Ano Desejado:');

  const [year] = years;
  await selectEvent.select(yearSelect, year.label);

  await waitFor(() => {
    expect(defaultWrapperProps.updateFilter).toBeCalledTimes(1);
    expect(defaultWrapperProps.updateFilter).toBeCalledWith(YEAR_KEY, year.value);
  });
});

test('controls the selected price with filters', async () => {
  const [firstPrice, secondPrice] = prices;
  const container = setup({ filters: { [PRICE_KEY]: { id: firstPrice.id } } });

  await waitFor(() => {
    expect(container.getByText(firstPrice.label)).toBeInTheDocument();
  });

  setup({ filters: { [PRICE_KEY]: { id: secondPrice.id } } }, container.rerender);

  expect(container.getByText(secondPrice.label)).toBeInTheDocument();
});

test('calls updateFilter on price selected', async () => {
  const container = setup();
  const priceSelect = container.getByText('Faixa de Preço');

  const [{
    id,
    label,
    min,
    max,
  }] = prices;
  await selectEvent.select(priceSelect, label);

  expect(defaultWrapperProps.updateFilter).toBeCalledTimes(1);
  expect(defaultWrapperProps.updateFilter).toBeCalledWith(PRICE_KEY, { id, min, max });
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
  fetchVersions.mockResolvedValue(versions);
  const container = setup({ filters: { [MODEL_ID_KEY]: 1 } });

  const versionSelect = container.getByText('Versão:');
  selectEvent.openMenu(versionSelect);

  await waitFor(() => {
    versions.forEach(({ name }) => {
      const option = container.getByText(name);
      expect(option).toBeInTheDocument();
    });
  });
});

test('clears the filters on button click', async () => {
  const container = setup();
  const clerarFiltersButton = container.getByText('Limpar filtros');

  fireEvent.click(clerarFiltersButton);

  await waitFor(() => {
    expect(defaultWrapperProps.clearFilters).toBeCalledTimes(1);
  });
});

test('search for the vehicles on button click', async () => {
  const container = setup();
  const searchButton = container.getByText('VER OFERTAS');

  fireEvent.click(searchButton);

  await waitFor(() => {
    expect(defaultWrapperProps.searchVehicles).toBeCalledTimes(1);
  });
});
