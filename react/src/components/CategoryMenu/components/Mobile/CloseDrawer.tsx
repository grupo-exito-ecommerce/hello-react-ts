import React from 'react';
import VtexIcon from 'puntoscolombia.store-utils/VtexIcon';
import { useDrawer } from 'vtex.store-drawer/DrawerContext';
import styles from '../../index.css';

const CloseDrawer = () => {
  const { close } = useDrawer();
  return (
    <div className={styles.closeDrawerContainer}>
      <div
        className={styles.closeDrawerButton}
        onClick={() => {
          close();
        }}
      >
        <VtexIcon id="nav-arrow--left" />
        <p className={styles.closeDrawerButtonText}>Cerrar</p>
      </div>
    </div>
  );
};

export default CloseDrawer;
