import React from 'react';
import { SubMenuType, CategoryMenuType, getChildrenItems } from '../../../../shared';
import styles from '../../index.css';
import VtexIcon from 'puntoscolombia.store-utils/VtexIcon';
import RenderLink from '../RenderLink';

interface Props {
  list: SubMenuType[];
  removeSubMenuCategories: (index: number) => void;
  handleClickMenuMobile: (item: CategoryMenuType) => void;
  allCategoriesChild: CategoryMenuType[];
}

const Category = (props: Props) => {
  const { list, removeSubMenuCategories, handleClickMenuMobile, allCategoriesChild } = props;

  return (
    <>
      {list.map((item, index) => {
        return (
          <div className={styles.listCategoryDetailMobile} style={{ zIndex: index + 1 }}>
            <div className={styles.closeDrawerContainer}>
              <div className={styles.arrowBackDrawer} onClick={() => removeSubMenuCategories(index)}>
                <VtexIcon id="mpa-arrow-left" />
                Volver
              </div>
            </div>
            <div className={styles.listDrawerContainer}>
              <div className={`${styles.categoryContentTitleDrawer} ${styles.departmentItem}`}>
                <a href={item.parent.href} className={styles.departmentItemText}>
                  {item.parent.name}
                </a>
              </div>

              {item.children.map(itemChildren => {
                const haveChildren = getChildrenItems(allCategoriesChild, itemChildren.id);

                return (
                  <RenderLink
                    {...{
                      classNames: styles.departmentItem,
                      itemChildren,
                      href: item.parent.href,
                      handleClickMenuMobile,
                      haveChildren: haveChildren.length > 0
                    }}
                  >
                    <>
                      {itemChildren.icon != '' ? (
                        <div
                          className={styles.departmentItemIcon}
                          dangerouslySetInnerHTML={{ __html: itemChildren.icon }}
                        />
                      ) : null}
                      <p className={styles.departmentItemText}>{itemChildren.name}</p>

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
        );
      })}
    </>
  );
};

export default Category;
