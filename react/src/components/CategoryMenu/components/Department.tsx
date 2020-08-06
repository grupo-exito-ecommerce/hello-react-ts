import React from 'react';
import styles from '../index.css';
import { ICategoryMenu } from '../../../../src/shared';
import VtexIcon from 'puntoscolombia.store-utils/VtexIcon';

interface Props {
  categories: ICategoryMenu[];
  departments: ICategoryMenu[];
  subcategories: ICategoryMenu[];
  handlerClickMenu: () => void;
  openMenu: boolean;
}

const Department = (props: Props) => {
  const { departments, handlerClickMenu, openMenu } = props;
  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categoryButton} onClick={() => handlerClickMenu()}>
        <div className={styles.categoryButtonIcon}>
          <VtexIcon id="hpa-menu-pco" size={25} />
        </div>
        <div className={styles.categoryButtonText}>
          <div>Compra por</div>
          <div>Categorías</div>
        </div>
      </div>
      {departments.length ? (
        <div
          className={`${styles.categoryDepartmentsContainer} ${
            openMenu ? styles.showCategoryDepartmentContainer : ''
          }`}
        >
          <div className={styles.categoryDepartmentsContainerItems}>
            {departments.map(item => (
              <div className={styles.departmentItem}>
                {item.icon != '' ? (
                  <div
                    className={styles.departmentItemIcon}
                    dangerouslySetInnerHTML={{ __html: item.icon }}
                  />
                ) : null}
                <a className={styles.departmentItemText} href={item.href}>
                  {item.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Department;
