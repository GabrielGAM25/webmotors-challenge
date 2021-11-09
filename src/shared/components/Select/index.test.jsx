import React from 'react';
import { cleanup, render } from '@testing-library/react';
import selectEvent from 'react-select-event';

import Select from '.';

const defaultProps = {
  options: [{ value: 'foo', label: 'bar' }],
  label: 'default label',
};

const setup = (props, renderer = render) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  renderer(<Select {...defaultProps} {...props} />)
);

afterEach(() => cleanup());

test('renders the label', () => {
  const label = <div>My label</div>;
  const container = setup({ label });

  const labelElement = container.getByText('My label');

  expect(labelElement).toBeInTheDocument();
});

test('renders the options', () => {
  const container = setup();

  const select = container.getByText(defaultProps.label);
  selectEvent.openMenu(select);

  defaultProps.options.forEach(({ label: optionLabel }) => {
    const option = container.getByText(optionLabel);
    expect(option).toBeInTheDocument();
  });
});
