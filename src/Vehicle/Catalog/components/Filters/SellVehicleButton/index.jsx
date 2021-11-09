import React from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export default function SellVehicleButton() {
  return (
    <Link to="/sell" className={styles.link}>
      Vender meu carro
    </Link>
  );
}
