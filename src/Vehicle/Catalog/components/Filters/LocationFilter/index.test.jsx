import { cleanup, render } from '@testing-library/react';
import React from 'react';
import selectEvent from 'react-select-event';

import CatalogContext from 'Vehicle/Catalog/Context';
import {
  cities,
  CITY_ID_KEY,
  radiusOptions,
  RADIUS_KEY,
} from 'Vehicle/Catalog/utils/constants';

import LocationFilter from '.';

const defaultProps = {
  filters: {},
  updateFilter: jest.fn(),
};

const setup = (props, renderer = render) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  renderer(
    <CatalogContext.Provider value={{ ...defaultProps, ...props }}>
      <LocationFilter />
    </CatalogContext.Provider>,
  )
);

afterEach(() => cleanup());

test('renders an option for each city', () => {
  const container = setup();

  const citySelect = container.getByText('Onde:');
  selectEvent.openMenu(citySelect);

  cities.forEach(({ name }) => {
    const option = container.getByText(name);
    expect(option).toBeInTheDocument();
  });
});

test('controls the selected city with filters', () => {
  const [firstCity, secondCity] = cities;
  const container = setup({ filters: { [CITY_ID_KEY]: firstCity.id } });

  expect(container.getByText(firstCity.name)).toBeInTheDocument();

  setup({ filters: { [CITY_ID_KEY]: secondCity.id } }, container.rerender);

  expect(container.getByText(secondCity.name)).toBeInTheDocument();
});

test('calls updateFilter on city selected', async () => {
  const container = setup();
  const citySelect = container.getByText('Onde:');

  const [city] = cities;
  await selectEvent.select(citySelect, city.name);

  expect(defaultProps.updateFilter).toBeCalledTimes(1);
  expect(defaultProps.updateFilter).toBeCalledWith(CITY_ID_KEY, city.id);
});

test('renders an option for each radius value', () => {
  const container = setup();

  const radiusSelect = container.getByText('Raio:');
  selectEvent.openMenu(radiusSelect);

  radiusOptions.forEach(({ label }) => {
    const option = container.getByText(label);
    expect(option).toBeInTheDocument();
  });
});

test('controls the selected radius with filters', () => {
  const [firstRadius, secondRadius] = radiusOptions;
  const container = setup({ filters: { [RADIUS_KEY]: firstRadius.value } });

  expect(container.getByText(firstRadius.label)).toBeInTheDocument();

  setup({ filters: { [RADIUS_KEY]: secondRadius.value } }, container.rerender);

  expect(container.getByText(secondRadius.label)).toBeInTheDocument();
});

test('calls updateFilter on radius selected', async () => {
  const container = setup();
  const radiusSelect = container.getByText('Raio:');

  const [radius] = radiusOptions;
  await selectEvent.select(radiusSelect, radius.label);

  expect(defaultProps.updateFilter).toBeCalledTimes(1);
  expect(defaultProps.updateFilter).toBeCalledWith(RADIUS_KEY, radius.value);
});
