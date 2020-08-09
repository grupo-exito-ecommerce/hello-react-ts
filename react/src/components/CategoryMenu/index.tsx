import pcoHooks from 'puntoscolombia.store-utils/useWidth';
import React, { useEffect, useState, FC } from 'react';
import { useLazyQuery } from 'react-apollo';
import { Spinner } from 'vtex.styleguide';
import { CategoryMenuType, getChildrenItems, SubMenuType } from '../../../src/shared';
import getMenuQuery from '../../graphql/queries/GetCategoryMenuQuery.graphql';
import Mobile from './components/Mobile';
import Web from './components/Web';
import DrawerWrapper from './components/DrawerWrapper';

const CATEGORY_ID = 'category-menu-pco';

const CategoryMenu: FC = props => {
  const { children } = props;
  const width = pcoHooks.useWidth();
  const isMobile = pcoHooks.contains(width, ['xs', 'sm']);

  const [getS3Categories, { loading, data, error }] = useLazyQuery(getMenuQuery);
  const [departments, setDepartments] = useState<CategoryMenuType[]>([]);
  const [categories, setCategories] = useState<CategoryMenuType[]>([]);
  const [subcategories, setSubcategories] = useState<CategoryMenuType[]>([]);
  const [allCategoriesChild, setAllCategoriesChild] = useState<CategoryMenuType[]>([]);
  const [loadingQuery, setLoadingQuery] = useState(true);
  const [errorOnReadFile, setErrorOnReadFile] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showCategoryItem, setShowCategoryItem] = useState<CategoryMenuType>();
  const [subMenuCategories, setSubMenuCategories] = useState<SubMenuType[]>([]);

  const handleClickMenuMobile = (item: CategoryMenuType) => {
    let subMenuItems = Object.assign([], subMenuCategories);
    subMenuItems.push({
      parent: item,
      children: getChildrenItems(allCategoriesChild, item.id)
    });
    setSubMenuCategories(subMenuItems);
  };

  const removeSubMenuCategories = (index: number) => {
    let subMenuItems = Object.assign([], subMenuCategories);
    subMenuItems.splice(index, 1);
    setSubMenuCategories(subMenuItems);
  };

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
    document.addEventListener('click', function(event: any) {
      var specifiedElement = document.getElementById(CATEGORY_ID);
      if (specifiedElement) {
        var isClickInside = specifiedElement.contains(event.target);
        if (isClickInside) {
          setCloseMenu(false);
        } else {
          setCloseMenu(true);
        }
      }
    });
  };

  const handlerClickMenu = (defaultState?: boolean) => {
    if (defaultState == null) {
      const state = !openMenu;
      setOpenMenu(state);
    } else {
      setOpenMenu(defaultState);
    }
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

  // useEffect(() => {
  //   if (isMobile && departments.length <= 0) {
  //     handlerClickMenu();
  //   }
  // }, [isMobile]);

  useEffect(() => {
    if (departments.length && !isMobile) {
      addEventListenerOnClick();
    }
    let allCategories: CategoryMenuType[] = [];
    allCategories.push.apply(allCategories, categories);
    allCategories.push.apply(allCategories, subcategories);
    setAllCategoriesChild(allCategories);
  }, [departments, categories, subcategories]);

  if (errorOnReadFile) return null;

  if (loadingQuery)
    return (
      <div className="h-100 w-100 flex justify-center">
        <Spinner />
      </div>
    );

  return isMobile ? (
    <DrawerWrapper {...{ isMobile, handlerClickMenu, header: children ? children[0] : <React.Fragment /> }}>
      <Mobile
        {...{
          departments,
          subcategories,
          removeSubMenuCategories,
          categories,
          handlerClickMenu,
          openMenu,
          allCategoriesChild,
          setShowCategoryItem,
          isMobile,
          showCategoryItem,
          setCloseMenu,
          handleClickMenuMobile,
          subMenuCategories
        }}
      />
    </DrawerWrapper>
  ) : (
    <div id={CATEGORY_ID}>
      <Web
        {...{
          departments,
          subcategories,
          categories,
          handlerClickMenu,
          isMobile,
          openMenu,
          setShowCategoryItem,
          showCategoryItem,
          setCloseMenu
        }}
      />
    </div>
  );
};

export default CategoryMenu;
