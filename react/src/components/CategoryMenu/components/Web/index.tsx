import React from 'react';
import { CategoryMenuType, getChildrenItems } from '../../../../shared';
import styles from '../../index.css';
import Category from './Category';
import CategoryButton from '../CategoryButton';

interface Props {
  categories: CategoryMenuType[];
  departments: CategoryMenuType[];
  setCloseMenu: React.Dispatch<React.SetStateAction<boolean>>;
  subcategories: CategoryMenuType[];
  handlerClickMenu: () => void;
  openMenu: boolean;
  isMobile: boolean;
  setShowCategoryItem: React.Dispatch<React.SetStateAction<CategoryMenuType>>;
  showCategoryItem: CategoryMenuType;
}

const Web = (props: Props) => {
  const {
    departments,
    handlerClickMenu,
    openMenu,
    setShowCategoryItem,
    showCategoryItem,
    isMobile,
    categories,
    subcategories,
    setCloseMenu
  } = props;
  const filterCategories = showCategoryItem ? getChildrenItems(categories, showCategoryItem.id) : [];

  return (
    <div className={styles.categoryContainer}>
      <CategoryButton {...{ handlerClickMenu, isMobile }} />
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

export default Web;
