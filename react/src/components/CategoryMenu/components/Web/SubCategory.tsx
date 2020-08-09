import React from 'react';
import { CategoryMenuType } from '../../../../shared';
import styles from '../../index.css';

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
