import React from 'react';
import styles from '../index.css';
import VtexIcon from 'puntoscolombia.store-utils/VtexIcon';

interface Props {
  handlerClickMenu?: () => void;
  isMobile: boolean;
}

const CategoryButton = ({ handlerClickMenu, isMobile }: Props) => {
  if (isMobile) {
    return (
      <div
        className={styles.categoryButtonMobile}
        onClick={() => (handlerClickMenu ? handlerClickMenu() : () => {})}
      >
        <div className={styles.categoryButtonIcon}>
          <VtexIcon id="hpa-menu-pco" size={23} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.categoryButton} onClick={() => (handlerClickMenu ? handlerClickMenu() : () => {})}>
      <div className={styles.categoryButtonIcon}>
        <VtexIcon id="hpa-menu-pco" size={23} />
      </div>
      <div className={styles.categoryButtonText}>
        <div>Compra por</div>
        <div className={styles.categoryButtonTextBig}>Categorías</div>
      </div>
    </div>
  );
};

export default CategoryButton;
