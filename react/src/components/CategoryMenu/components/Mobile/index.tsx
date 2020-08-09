import VtexIcon from 'puntoscolombia.store-utils/VtexIcon';
import React from 'react';
import { CategoryMenuType, getChildrenItems, SubMenuType } from '../../../../shared';
import styles from '../../index.css';
import RenderLink from '../RenderLink';
import Category from './Category';
import CloseDrawer from './CloseDrawer';

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
  handleClickMenuMobile: (item: CategoryMenuType) => void;
  subMenuCategories: SubMenuType[];
  removeSubMenuCategories: (index: number) => void;
  allCategoriesChild: CategoryMenuType[];
}

const Mobile = (props: Props) => {
  const {
    departments,
    openMenu,
    handleClickMenuMobile,
    subMenuCategories,
    removeSubMenuCategories,
    allCategoriesChild,
    categories
  } = props;

  return (
    <div className={styles.drawerContainer}>
      <CloseDrawer />
      {departments.length ? (
        <div
          className={`${styles.categoryDepartmentsContainerMobile} ${
            openMenu ? styles.showCategoryDepartmentContainer : ''
          }`}
        >
          <div className={styles.showCategoryDepartmentContainerInner} style={{ width: '100%' }}>
            <div className={styles.categoryDepartmentsContainerItems}>
              {departments.map(item => {
                const haveChildren = getChildrenItems(categories, item.id);
                return (
                  <RenderLink
                    {...{
                      classNames: styles.departmentItem,
                      itemChildren: item,
                      href: item.href,
                      handleClickMenuMobile,
                      haveChildren: haveChildren.length > 0
                    }}
                  >
                    <>
                      {item.icon != '' ? (
                        <div
                          className={styles.departmentItemIcon}
                          dangerouslySetInnerHTML={{ __html: item.icon }}
                        />
                      ) : null}
                      <p className={styles.departmentItemText}>{item.name}</p>

                      {haveChildren.length ? (
                        <div className={styles.departmentIconDrawer}>
                          <VtexIcon id="mpa-arrow-right" />
                        </div>
                      ) : null}
                    </>
                  </RenderLink>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      {departments.length && subMenuCategories.length ? (
        <Category
          {...{ list: subMenuCategories, removeSubMenuCategories, handleClickMenuMobile, allCategoriesChild }}
        />
      ) : null}
    </div>
  );
};

export default Mobile;
