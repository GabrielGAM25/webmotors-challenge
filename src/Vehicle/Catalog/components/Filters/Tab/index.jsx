import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './styles.module.scss';

export default function Tab({
  name,
  icon,
  onClick,
  isActive,
}) {
  const handleClick = () => onClick(name);

  return (
    <button
      type="button"
      className={classNames(styles.tab, isActive && styles.active)}
      role="tab"
      onClick={handleClick}
    >
      <FontAwesomeIcon
        className={styles.icon}
        icon={icon}
        data-testid="icon"
      />
      <div className={styles.tabText}>
        <div className={styles.smallText}>
          COMPRAR
        </div>
        <div className={styles.bigText}>
          {name.toUpperCase()}
        </div>
      </div>
    </button>
  );
}

Tab.defaultProps = {
  isActive: false,
};

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
};
