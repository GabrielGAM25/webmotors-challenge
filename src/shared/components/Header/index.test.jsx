import { cleanup, render, within } from '@testing-library/react';
import React from 'react';

import logo from 'shared/assets/logo.png';

import Header from '.';

const setup = () => render(<Header />);

afterEach(() => cleanup());

test('renders the header', () => {
  const container = setup();
  const header = container.getByRole('banner');

  expect(header).toBeInTheDocument();
});

test('renders the logo inside the header', () => {
  const container = setup();
  const header = container.getByRole('banner');
  const imgElement = within(header).getByAltText('Webmotors logo');

  expect(imgElement.src).toContain(logo);
});
