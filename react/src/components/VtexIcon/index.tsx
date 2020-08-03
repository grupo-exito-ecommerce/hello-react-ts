import { Icon } from 'vtex.store-icons';
import { IconList } from '../SiteIconList';

export interface IconType {
  id: string;
  size?: number;
  isActive?: boolean;
  activeClassName?: string;
  mutedClassName?: string;
}

const defaultIconProps: IconType = {
  id: 'hpa-cart',
  size: 16,
  isActive: true
};

const VtexIcon = (props: IconType) => <Icon {...props} />;

VtexIcon.getSchema = () => {
  return {
    title: 'admin/category-menu.vtexIcon.title',
    type: 'object',
    properties: {
      id: {
        title: 'admin/category-menu.vtexIcon.id',
        type: 'string',
        enum: IconList
      },
      size: {
        title: 'admin/category-menu.vtexIcon.size',
        type: 'string'
      }
    }
  };
};

VtexIcon.defaultProps = defaultIconProps;

export default VtexIcon;
