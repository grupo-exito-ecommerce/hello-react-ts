import React from 'react';
import VtexIcon from 'puntoscolombia.store-utils/VtexIcon';
import { useDrawer } from 'vtex.store-drawer/DrawerContext';

import styles from '../../index.css';

interface Props {
  handlerClickMenu: (defaultState?: boolean) => void;
}

const CloseDrawer = (props: Props) => {
  const { handlerClickMenu } = props;
  const { close } = useDrawer();
  return (
    <div className={styles.closeDrawerContainer}>
      <div
        className={styles.closeDrawerButton}
        onClick={() => {
          handlerClickMenu(false);
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
