import {
  cleanup, fireEvent, render, within,
} from '@testing-library/react';
import React from 'react';

import Tab from '.';
import styles from './styles.module.scss';

const defaultProps = {
  name: 'carros',
  icon: 'car',
  onClick: jest.fn(),
  isActive: false,
};

const setup = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  render(<Tab {...defaultProps} {...props} />)
);

afterEach(() => cleanup());

test('renders the tab name in uppercase', () => {
  const { name } = defaultProps;
  const container = setup();
  const tab = container.getByRole('tab');

  expect(tab.textContent).toEqual(`COMPRAR${name.toUpperCase()}`);
});

test('renders the tab icon', () => {
  const { icon } = defaultProps;
  const container = setup();
  const tab = container.getByRole('tab');
  const iconElement = within(tab).getByTestId('icon');

  expect(iconElement).toHaveClass(`fa-${icon}`);
});

test('adds a css class to the tab when the tab is active', () => {
  const container = setup({ isActive: true });
  const tab = container.getByRole('tab');

  expect(tab).toHaveClass(styles.active);
});

test('calls onCLick with the name when clicked', () => {
  const { name, onClick } = defaultProps;

  const container = setup({ isActive: true });
  const tab = container.getByRole('tab');
  fireEvent.click(tab);

  expect(onClick).toBeCalledWith(name);
  expect(onClick).toBeCalledTimes(1);
});
