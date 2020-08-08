import React from 'react';
import styles from '../index.css';
import { CategoryMenuType, getChildrenItems } from '../../../../src/shared';
import VtexIcon from 'puntoscolombia.store-utils/VtexIcon';
import Category from './Category';

interface Props {
  categories: CategoryMenuType[];
  departments: CategoryMenuType[];
  setCloseMenu: React.Dispatch<React.SetStateAction<boolean>>;
  subcategories: CategoryMenuType[];
  handlerClickMenu: () => void;
  openMenu: boolean;
  setShowCategoryItem: React.Dispatch<React.SetStateAction<CategoryMenuType>>;
  showCategoryItem: CategoryMenuType;
}

const Department = (props: Props) => {
  const {
    departments,
    handlerClickMenu,
    openMenu,
    setShowCategoryItem,
    showCategoryItem,
    categories,
    subcategories,
    setCloseMenu
  } = props;
  const filterCategories = showCategoryItem ? getChildrenItems(categories, showCategoryItem.id) : [];

  return (
    <div className={styles.categoryContainer}>
      <div className={styles.categoryButton} onClick={() => handlerClickMenu()}>
        <div className={styles.categoryButtonIcon}>
          <VtexIcon id="hpa-menu-pco" size={23} />
        </div>
        <div className={styles.categoryButtonText}>
          <div>Compra por</div>
          <div>Categorías</div>
        </div>
      </div>
      {departments.length ? (
        <div
          onMouseLeave={() => setCloseMenu(true)}
          className={`${styles.categoryDepartmentsContainer} ${
            openMenu ? styles.showCategoryDepartmentContainer : ''
          }`}
        >
          <div className={styles.showCategoryDepartmentContainerInner}>
            <div className={styles.categoryDepartmentsContainerItems}>
              {departments.map(item => {
                return (
                  <>
                    <a
                      href={item.href}
                      className={styles.departmentItem}
                      onMouseEnter={() => setShowCategoryItem(item)}
                      onMouseLeave={() => setShowCategoryItem(item)}
                    >
                      {item.icon != '' ? (
                        <div
                          className={styles.departmentItemIcon}
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                      ) : null}
                      <p className={styles.departmentItemText}>{item.name}</p>
                    </a>
                  </>
                );
              })}
            </div>
          </div>
          {showCategoryItem && (
            <Category
              {...{
                categories: filterCategories,
                department: showCategoryItem,
                subcategories,
                departments
              }}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Department;
