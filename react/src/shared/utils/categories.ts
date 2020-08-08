import { CategoryMenuType } from './../models/categories';
export const getChildrenItems = (category: CategoryMenuType[], id: number | string) => {
  return category.filter(item => item.parent == id && item.enable);
};
