import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import SellVehicleButton from '.';

const setup = () => render(<SellVehicleButton />, { wrapper: BrowserRouter });

afterEach(() => cleanup());

test('renders a link to the vehicles selling page', () => {
  const container = setup();

  const link = container.getByRole('link');
  fireEvent.click(link);

  expect(window.location.pathname).toEqual('/sell');
});
