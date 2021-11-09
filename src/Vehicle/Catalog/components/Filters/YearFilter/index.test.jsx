import { cleanup, render, waitFor } from '@testing-library/react';
import React from 'react';
import selectEvent from 'react-select-event';

import CatalogContext from 'Vehicle/Catalog/Context';
import { YEAR_KEY, years } from 'Vehicle/Catalog/utils/constants';

import YearFilter from '.';

const defaultProps = {
  filters: {},
  updateFilter: jest.fn(),
};

const setup = (props, renderer = render) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  renderer(
    <CatalogContext.Provider value={{ ...defaultProps, ...props }}>
      <YearFilter />
    </CatalogContext.Provider>,
  )
);

afterEach(() => cleanup());

test('renders an option for year', async () => {
  const container = setup();

  const yearSelect = container.getByText('Ano Desejado:');
  selectEvent.openMenu(yearSelect);

  await waitFor(() => {
    years.forEach(({ label }) => {
      const option = container.getByText(label);
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

  const [{ value, label }] = years;
  await selectEvent.select(yearSelect, label);

  expect(defaultProps.updateFilter).toBeCalledTimes(1);
  expect(defaultProps.updateFilter).toBeCalledWith(YEAR_KEY, value);
});
