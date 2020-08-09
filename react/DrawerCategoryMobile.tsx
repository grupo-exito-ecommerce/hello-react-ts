import React from 'react';
import CategoryButton from './src/components/CategoryMenu/components/CategoryButton';

const DrawerCategoryMobile = () => {
  return <CategoryButton {...{ isMobile: true }} />;
};

export default DrawerCategoryMobile;
