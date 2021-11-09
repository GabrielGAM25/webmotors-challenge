import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

export default function Checkbox({ label, isChecked, onToggle }) {
  const checkboxId = `checkbox-${label}`;

  const handleToggle = ({ target }) => onToggle(target.checked);

  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        id={checkboxId}
        onChange={handleToggle}
        checked={isChecked}
      />
      <label htmlFor={checkboxId}>
        {label}
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};
