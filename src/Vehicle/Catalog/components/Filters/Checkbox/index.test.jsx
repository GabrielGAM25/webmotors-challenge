import { cleanup, fireEvent, render } from '@testing-library/react';
import React from 'react';

import Checkbox from '.';

const defaultProps = {
  label: 'Novo',
  isChecked: false,
  onToggle: jest.fn(),
};

const setup = (props, renderer = render) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  renderer(<Checkbox {...defaultProps} {...props} />)
);

afterEach(() => cleanup());

test('renders the label', () => {
  const container = setup();

  const label = container.getByLabelText(defaultProps.label);

  expect(label).toBeInTheDocument();
});

test('controls the checkbox state with isChecked', () => {
  const container = setup({ isChecked: true });
  const checkbox = container.getByRole('checkbox');

  expect(checkbox).toBeChecked();

  setup({ isChecked: false }, container.rerender);

  expect(checkbox).not.toBeChecked();
});

test('calls onToggle with isChecked value', () => {
  const container = setup({ isChecked: false });
  const checkbox = container.getByRole('checkbox');

  fireEvent.click(checkbox);
  expect(defaultProps.onToggle).toHaveBeenLastCalledWith(true);

  setup({ isChecked: true }, container.rerender);

  fireEvent.click(checkbox);
  expect(defaultProps.onToggle).toHaveBeenLastCalledWith(false);
});
