import React, { FC } from 'react';
import { CategoryMenuType } from '../../../shared';

const RenderLink: FC<{
  haveChildren: boolean;
  handleClickMenuMobile?: (item: CategoryMenuType) => void;
  href: string;
  itemChildren: CategoryMenuType;
  classNames: any;
}> = props => {
  const { haveChildren, classNames, handleClickMenuMobile, children, href, itemChildren } = props;
  if (haveChildren) {
    return (
      <div className={classNames} onClick={() => handleClickMenuMobile(itemChildren)}>
        {children}
      </div>
    );
  }
  return (
    <a className={classNames} href={href}>
      {children}
    </a>
  );
};

export default RenderLink;
