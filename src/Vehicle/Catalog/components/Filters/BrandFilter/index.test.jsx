import { cleanup, render, waitFor } from '@testing-library/react';
import React from 'react';
import selectEvent from 'react-select-event';

import fetchBrands from 'Brand/api/fetch';
import CatalogContext from 'Vehicle/Catalog/Context';
import { BRAND_ID_KEY, allBrandsOption } from 'Vehicle/Catalog/utils/constants';

import BrandFilter from '.';

jest.mock('Brand/api/fetch');

const defaultProps = {
  filters: {},
  updateFilter: jest.fn(),
};

const setup = (props, renderer = render) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  renderer(
    <CatalogContext.Provider value={{ ...defaultProps, ...props }}>
      <BrandFilter />
    </CatalogContext.Provider>,
  )
);

afterEach(() => cleanup());

const brands = [
  { id: 1, name: 'Chevrolet' },
  { id: 2, name: 'Honda' },
  { id: 3, name: 'Ford' },
];

beforeEach(() => {
  fetchBrands.mockResolvedValue(brands);
});

test('set the allBrandsOption as the default option', async () => {
  const container = setup();

  const defaultOption = container.getByText(allBrandsOption.name);

  await waitFor(() => {
    expect(defaultOption).toBeInTheDocument();
  });
});

test('renders an option for each fetched brand', async () => {
  const container = setup();

  const brandSelect = container.getByText('Marca:');
  selectEvent.openMenu(brandSelect);

  await waitFor(() => {
    brands.forEach(({ name }) => {
      const option = container.getByText(name);
      expect(option).toBeInTheDocument();
    });
  });
});

test('controls the selected brand with filters', async () => {
  const [firstBrand, secondBrand] = brands;
  const container = setup({ filters: { [BRAND_ID_KEY]: firstBrand.id } });

  await waitFor(() => {
    expect(container.getByText(firstBrand.name)).toBeInTheDocument();
  });

  setup({ filters: { [BRAND_ID_KEY]: secondBrand.id } }, container.rerender);

  expect(container.getByText(secondBrand.name)).toBeInTheDocument();
});

test('calls updateFilter on brand selected', async () => {
  const container = setup();
  const brandSelect = container.getByText('Marca:');

  const [{ name, id }] = brands;
  await selectEvent.select(brandSelect, name);

  expect(defaultProps.updateFilter).toBeCalledTimes(1);
  expect(defaultProps.updateFilter).toBeCalledWith(BRAND_ID_KEY, id);
});
