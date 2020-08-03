import React from 'react';
import VtexIcon, { IconType } from '../VtexIcon';
import styles from './index.css';
import { Box, Card } from 'vtex.styleguide';

interface SiteIconProps {
  icons: IconType[];
}

export const IconList = [
  'mpa-minus-icon',
  'mpa-more-icon',
  'bnd-logo-pco',
  'mpa-catalogue-icon',
  'hpa-minicart',
  'hpa-travel',
  'hpa-partners',
  'hpa-us',
  'mpa-arrow-left',
  'mpa-arrow-bottom'
];

const iconListDefaultProps: SiteIconProps = {
  icons: [
    { id: 'mpa-minus-icon', size: 30 },
    { id: 'mpa-more-icon', size: 30 },
    { id: 'bnd-logo-pco', size: 30 },
    { id: 'mpa-catalogue-icon', size: 30 },
    { id: 'hpa-minicart', size: 30 },
    { id: 'hpa-travel', size: 30 },
    { id: 'hpa-partners', size: 30 },
    { id: 'hpa-us', size: 30 },
    { id: 'mpa-arrow-left', size: 30 },
    { id: 'mpa-arrow-bottom', size: 30 }
  ]
};

const SiteIconList = (props: SiteIconProps) => {
  const { icons } = props;
  return (
    <div className={styles.iconListContainer}>
      <Box title="Iconos">
        <div className={styles.iconListItems}>
          {icons.map(item => (
            <div className={styles.iconListItem}>
              <Card>
                <h4>{item.id}</h4>
                <VtexIcon {...item} />
              </Card>
            </div>
          ))}
        </div>
      </Box>
    </div>
  );
};

SiteIconList.getSchema = () => {
  return {
    title: 'admin/editor.vtexIcon.title',
    type: 'object',
    properties: {
      icon: {
        title: 'admin/editor.vtexIcon.icon',
        type: 'string'
      }
    }
  };
};

SiteIconList.defaultProps = iconListDefaultProps;

export default SiteIconList;
