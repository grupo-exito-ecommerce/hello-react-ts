import React, { useEffect, useState } from 'react';
import VtexIcon from '../VtexIcon';
import styles from './index.css';
import { ItemsType, ItemsList } from './model';

export const SubItems = (props: { subItems: ItemsType[]; isActive: boolean }) => {
  const { subItems, isActive } = props;
  return (
    isActive && (
      <div className={styles.subItemsContainer}>
        {subItems.map(item => {
          return (
            <a target={item.isExternal ? '_blank' : '_self'} href={item.url} className={styles.subItemLink}>
              {item.name}
            </a>
          );
        })}
      </div>
    )
  );
};

export const Items = ({
  item,
  closeAll,
  globalState,
  setGlobalState
}: {
  item: ItemsList;
  closeAll: boolean;
  globalState: string;
  setGlobalState: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isActive, setIsActive] = useState(false);

  const handlerClick = () => {
    setGlobalState(item.id);
    if (globalState != '' && globalState == item.id) {
      const state = !isActive;
      setIsActive(state);
    }
  };

  useEffect(() => {
    if (globalState != '' && globalState == item.id) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [globalState]);

  useEffect(() => {
    if (closeAll) {
      setIsActive(false);
    }
  }, [closeAll]);

  return (
    <div className={styles.navigationItem} onClick={() => handlerClick()}>
      {item.icon && (
        <div className={styles.navigationIcon}>
          <VtexIcon {...{ id: item.icon, size: 20 }} />
        </div>
      )}
      <p className={styles.navigationText}>{item.name}</p>
      {item.subLinks.length > 0 && (
        <div className={styles.arrowNavigation}>
          <VtexIcon {...{ id: 'mpa-arrow-bottom', size: 10 }} />
        </div>
      )}
      {item.subLinks.length > 0 && <SubItems {...{ subItems: item.subLinks, isActive }} />}
    </div>
  );
};
