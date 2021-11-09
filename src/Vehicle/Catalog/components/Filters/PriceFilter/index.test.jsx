import { cleanup, render, waitFor } from '@testing-library/react';
import React from 'react';
import selectEvent from 'react-select-event';

import CatalogContext from 'Vehicle/Catalog/Context';
import { PRICE_KEY, prices } from 'Vehicle/Catalog/utils/constants';

import PriceFilter from '.';

const defaultProps = {
  filters: {},
  updateFilter: jest.fn(),
};

const setup = (props, renderer = render) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  renderer(
    <CatalogContext.Provider value={{ ...defaultProps, ...props }}>
      <PriceFilter />
    </CatalogContext.Provider>,
  )
);

afterEach(() => cleanup());

test('renders an option for price', async () => {
  const container = setup();

  const priceSelect = container.getByText('Faixa de Preço');
  selectEvent.openMenu(priceSelect);

  await waitFor(() => {
    prices.forEach(({ label }) => {
      const option = container.getByText(label);
      expect(option).toBeInTheDocument();
    });
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

  expect(defaultProps.updateFilter).toBeCalledTimes(1);
  expect(defaultProps.updateFilter).toBeCalledWith(PRICE_KEY, { id, min, max });
});
