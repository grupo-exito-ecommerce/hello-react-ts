import React from 'react';
import { CategoryMenuType, getChildrenItems } from '../../../../shared';
import styles from '../../index.css';
import SubCategory from './SubCategory';

interface CategoryProps {
  department: CategoryMenuType;
  departments: CategoryMenuType[];
  categories: CategoryMenuType[];
  subcategories: CategoryMenuType[];
}

const Category = (props: CategoryProps) => {
  const { department, categories, subcategories } = props;
  return (
    <div className={styles.categoryContent}>
      <a href={department.href} className={styles.categoryContentTitle}>
        {department.name}
      </a>
      <div className={styles.categoryInnerContent}>
        {categories.map(item => {
          const filterSubCategories = getChildrenItems(subcategories, item.id);
          return (
            <div className={styles.categoryColumn}>
              <a href={item.href} className={styles.categoryItemTitle}>
                {item.name}
              </a>
              <SubCategory {...{ subcategories: filterSubCategories }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;
