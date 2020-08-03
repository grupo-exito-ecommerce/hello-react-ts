import React from 'react';
import styles from './index.css';
import VtexIcon from '../VtexIcon';

interface ItemsType {
  name: string;
  url?: string;
  isExternal?: boolean;
  icon?: string;
}

interface Items extends ItemsType {
  subLinks: ItemsType[];
}

interface NavigationProps {
  links: Items[];
}

const defaultProps: NavigationProps = {
  links: [
    {
      name: 'Nosotros',
      icon: 'hpa-us',
      subLinks: [
        {
          name: 'Conócenos'
        },
        {
          name: 'Ayuda'
        },
        {
          name: 'Calculadora de puntos'
        },
        {
          name: 'Documentos legales'
        }
      ]
    },
    {
      name: 'Tienda Online',
      icon: 'mpa-catalogue-icon',
      subLinks: [
        {
          name: 'Cátalogo'
        },
        {
          name: 'Bonos'
        }
      ]
    },
    {
      name: 'Viajes',
      icon: 'hpa-travel',
      subLinks: []
    },
    {
      name: 'Aliados',
      icon: 'hpa-partners',
      subLinks: []
    }
  ]
};

const NavigationLinks = (props: NavigationProps) => {
  const { links } = props;
  return (
    <div className={styles.navigationLinksContainer}>
      {links.map(item => {
        return (
          <div className={styles.navigationItem}>
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
          </div>
        );
      })}
    </div>
  );
};

NavigationLinks.defaultProps = defaultProps;

export default NavigationLinks;
