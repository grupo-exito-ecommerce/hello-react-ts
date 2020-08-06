import React, { useEffect, useState } from 'react';
import Department from './components/Department';
import { useLazyQuery } from 'react-apollo';
import { ICategoryMenu } from '../../../src/shared';
import getMenuQuery from '../../graphql/queries/GetCategoryMenuQuery.graphql';

const CategoryMenu = () => {
  const [getS3Categories, { loading, data, error }] = useLazyQuery(getMenuQuery);
  const [departments, setDepartments] = useState<ICategoryMenu[]>([]);
  const [categories, setCategories] = useState<ICategoryMenu[]>([]);
  const [subcategories, setSubcategories] = useState<ICategoryMenu[]>([]);
  const [loadingQuery, setLoadingQuery] = useState(true);
  const [errorOnReadFile, setErrorOnReadFile] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const getDepartments = (megaMenuLevel: ICategoryMenu[]): ICategoryMenu[] => {
    if (megaMenuLevel) {
      const deps = megaMenuLevel.filter((value: ICategoryMenu) => value.parent === null);
      return deps;
    }
    return [];
  };

  const getSubcategories = (megaMenuLevel: ICategoryMenu[]): ICategoryMenu[] => {
    const subcategories: ICategoryMenu[] = [];
    const cats = getCategories(megaMenuLevel);
    if (megaMenuLevel) {
      cats.forEach((category: ICategoryMenu) => {
        const categoriesChild = megaMenuLevel.filter((value: ICategoryMenu) => value.parent === category.id);
        subcategories.push(...categoriesChild);
      });
    }
    return subcategories;
  };

  const getCategories = (megaMenuLevel: ICategoryMenu[]): ICategoryMenu[] => {
    const categories: ICategoryMenu[] = [];
    const deps = getDepartments(megaMenuLevel);
    if (megaMenuLevel) {
      deps.forEach(department => {
        const departmentChild = megaMenuLevel.filter(
          (value: ICategoryMenu) => value.parent === department.id
        );
        categories.push(...departmentChild);
      });
    }
    return categories;
  };

  const addEventListenerOnClick = () => {
    var specifiedElement = document.getElementById('category-menu-pco');
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
        setDepartments(currentDepartments);
        setCategories(getCategories(megaMenu));
        setSubcategories(getSubcategories(megaMenu));
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
    console.log(departments);
    console.log(categories);
    console.log(subcategories);
    if (departments.length) {
      addEventListenerOnClick();
    }
  }, [departments, categories, subcategories]);

  if (errorOnReadFile) return null;

  return !loadingQuery ? (
    <div id="category-menu-pco">
      <Department {...{ departments, subcategories, categories, handlerClickMenu, openMenu }} />
    </div>
  ) : null;
};

export default CategoryMenu;
