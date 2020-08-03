import { Icon } from 'vtex.store-icons';

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

VtexIcon.defaultProps = defaultIconProps;

export default VtexIcon;
