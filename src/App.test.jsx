import React from 'react';
import { cleanup, render, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import logo from 'shared/assets/logo.png';

import App from './App';

const setup = () => render(<App />, { wrapper: BrowserRouter });

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

test('redirects to vehicles screen by default', () => {
  setup();
  expect(window.location.pathname).toEqual('/vehicles');
});
