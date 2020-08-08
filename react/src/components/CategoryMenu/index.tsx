import React, { useEffect, useState } from 'react';
import { useLazyQuery } from 'react-apollo';
import { CategoryMenuType, getChildrenItems } from '../../../src/shared';
import getMenuQuery from '../../graphql/queries/GetCategoryMenuQuery.graphql';
import Department from './components/Department';

const CATEGORY_ID = 'category-menu-pco';

const CategoryMenu = () => {
  const [getS3Categories, { loading, data, error }] = useLazyQuery(getMenuQuery);
  const [departments, setDepartments] = useState<CategoryMenuType[]>([]);
  const [categories, setCategories] = useState<CategoryMenuType[]>([]);
  const [subcategories, setSubcategories] = useState<CategoryMenuType[]>([]);
  const [loadingQuery, setLoadingQuery] = useState(true);
  const [errorOnReadFile, setErrorOnReadFile] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showCategoryItem, setShowCategoryItem] = useState<CategoryMenuType>();

  const getDepartments = (megaMenuLevel: CategoryMenuType[]): CategoryMenuType[] => {
    if (megaMenuLevel) {
      const deps = megaMenuLevel.filter((value: CategoryMenuType) => value.parent === null);
      return deps;
    }
    return [];
  };

  const getSubcategories = (megaMenuLevel: CategoryMenuType[]): CategoryMenuType[] => {
    const subcategories: CategoryMenuType[] = [];
    const cats = getCategories(megaMenuLevel);
    if (megaMenuLevel) {
      cats.forEach((category: CategoryMenuType) => {
        const categoriesChild = megaMenuLevel.filter(
          (value: CategoryMenuType) => value.parent === category.id
        );
        subcategories.push(...categoriesChild);
      });
    }
    return subcategories;
  };

  const getCategories = (megaMenuLevel: CategoryMenuType[]): CategoryMenuType[] => {
    const categories: CategoryMenuType[] = [];
    const deps = getDepartments(megaMenuLevel);
    if (megaMenuLevel) {
      deps.forEach(department => {
        const departmentChild = megaMenuLevel.filter(
          (value: CategoryMenuType) => value.parent === department.id
        );
        categories.push(...departmentChild);
      });
    }
    return categories;
  };

  const addEventListenerOnClick = () => {
    var specifiedElement = document.getElementById(CATEGORY_ID);
    document.addEventListener('click', function(event: any) {
      var isClickInside = specifiedElement.contains(event.target);
      if (isClickInside) {
        setCloseMenu(false);
      } else {
        setCloseMenu(true);
      }
    });
  };

  const handlerClickMenu = () => {
    const state = !openMenu;
    setOpenMenu(state);
  };

  useEffect(() => {
    if (closeMenu) {
      setOpenMenu(false);
    }
  }, [closeMenu]);

  useEffect(() => {
    if (error) {
      setDepartments([]);
      setLoadingQuery(false);
      setErrorOnReadFile(true);
    }
    if (!loading) {
      if (data && data.getCategoryMenu && data.getCategoryMenu.data.categories) {
        setErrorOnReadFile(false);
        setLoadingQuery(false);
        const megaMenu = data.getCategoryMenu.data.categories;
        const currentDepartments = getDepartments(megaMenu);
        setDepartments(getChildrenItems(currentDepartments, null));
        setCategories(getCategories(megaMenu));
        setSubcategories(getSubcategories(megaMenu));
        setShowCategoryItem(currentDepartments[0]);
      } else {
        setLoadingQuery(false);
        setLoadingQuery(false);
      }
    }
  }, [data]);

  useEffect(() => {
    getS3Categories();
  }, []);

  useEffect(() => {
    if (departments.length) {
      addEventListenerOnClick();
    }
  }, [departments, categories, subcategories]);

  if (errorOnReadFile) return null;

  return !loadingQuery ? (
    <div id={CATEGORY_ID}>
      <Department
        {...{
          departments,
          subcategories,
          categories,
          handlerClickMenu,
          openMenu,
          setShowCategoryItem,
          showCategoryItem,
          setCloseMenu
        }}
      />
    </div>
  ) : null;
};

export default CategoryMenu;
