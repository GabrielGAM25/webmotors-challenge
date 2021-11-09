import React from 'react';

import logo from 'shared/assets/logo.png';

import styles from './styles.module.scss';

export default function Header() {
  return (
    <div className={styles.header} role="banner">
      <img src={logo} alt="Webmotors logo" />
    </div>
  );
}
