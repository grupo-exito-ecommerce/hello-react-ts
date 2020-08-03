import React, { useEffect, useState } from 'react';
import styles from './index.css';
import { NavigationProps } from './model';
import { defaultPropsNavigation, schema } from './schema';
import { Items } from './Items';
import { makeId } from './methods';

const NavigationLinks = (props: NavigationProps) => {
  const { links } = props;
  const [globalState, setGlobalState] = useState('');
  const [linkToUse, setLinkToUse] = useState([]);
  const [closeAll, setCloseAll] = useState(false);

  useEffect(() => {
    setLinkToUse(
      links.map(item => {
        item.id = makeId(10);
        return item;
      })
    );

    var specifiedElement = document.getElementById('navigationItem');
    document.addEventListener('click', function(event: any) {
      var isClickInside = specifiedElement.contains(event.target);
      if (isClickInside) {
        setCloseAll(false);
      } else {
        setCloseAll(true);
      }
    });
  }, [links]);

  return (
    <div id="navigationItem" className={styles.navigationLinksContainer}>
      {linkToUse.length
        ? linkToUse.map(item => {
            return <Items {...{ item, globalState, setGlobalState, closeAll }} />;
          })
        : null}
    </div>
  );
};

NavigationLinks.defaultProps = defaultPropsNavigation;

NavigationLinks.getSchema = () => {
  return schema;
};

export default NavigationLinks;
