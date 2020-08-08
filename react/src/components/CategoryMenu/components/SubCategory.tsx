import React from 'react';
import styles from '../index.css';

import { CategoryMenuType } from '../../../shared';

interface SubCategoryProps {
  subcategories: CategoryMenuType[];
}

const SubCategory = (props: SubCategoryProps) => {
  const { subcategories } = props;
  return (
    <div className={styles.subCategoryInnerContent}>
      {subcategories.map(item => (
        <a className={styles.subCategoryLink} href="">
          {item.name}
        </a>
      ))}
    </div>
  );
};

export default SubCategory;
