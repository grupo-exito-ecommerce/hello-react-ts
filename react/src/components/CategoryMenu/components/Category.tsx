import React from 'react';
import styles from '../index.css';
import { CategoryMenuType, getChildrenItems } from '../../../shared';
import SubCategory from './SubCategory';

interface CategoryProps {
  department: CategoryMenuType;
  departments: CategoryMenuType[];
  categories: CategoryMenuType[];
  subcategories: CategoryMenuType[];
}

const Category = (props: CategoryProps) => {
  const { departments, department, categories, subcategories } = props;
  const heightContent = departments.length >= 10 ? 460 : 30 * departments.length;
  return (
    <div className={styles.categoryContent} style={{ maxHeight: `${heightContent}px` }}>
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
