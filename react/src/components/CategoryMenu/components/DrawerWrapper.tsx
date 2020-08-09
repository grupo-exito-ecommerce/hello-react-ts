import React, { FC } from 'react';
import Drawer from 'vtex.store-drawer/Drawer';
import CategoryButton from './CategoryButton';

interface Props {
  handlerClickMenu: (defaultState?: boolean) => void;
  isMobile: boolean;
  children: React.ReactElement;
  header: React.ReactElement;
}

const DrawerWrapper: FC<Props> = props => {
  const { handlerClickMenu, isMobile, children, header } = props;
  return (
    <Drawer {...{ customIcon: <CategoryButton {...{ handlerClickMenu, isMobile }} />, children, header }} />
  );
};

export default DrawerWrapper;
