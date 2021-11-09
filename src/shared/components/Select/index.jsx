/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components as defaultComponents, mergeStyles } from 'react-select';

import defaultStyles from './styles';

export default function Select({
  label,
  styles,
  components,
  ...props
}) {
  const renderValueContainer = useCallback(({ children, ...valueContainerProps }) => (
    <defaultComponents.ValueContainer {...valueContainerProps}>
      {label}
      {children}
    </defaultComponents.ValueContainer>
  ), []);

  return (
    <ReactSelect
      {...props}
      styles={mergeStyles(defaultStyles, styles)}
      components={{ ...components, ValueContainer: renderValueContainer }}
    />
  );
}

Select.defaultProps = {
  label: null,
  styles: {},
  components: {},
};

Select.propTypes = {
  label: PropTypes.node,
  styles: PropTypes.shape({}),
  components: PropTypes.shape({}),
};
