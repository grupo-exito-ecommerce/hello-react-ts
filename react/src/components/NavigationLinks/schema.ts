import { NavigationProps } from './model';
import { IconList } from './../SiteIconList/index';

export const defaultPropsNavigation: NavigationProps = {
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

const SubItemSchema = {
  isExternal: {
    default: false,
    title: 'admin/category-menu.navigationLinks.sponsored.external',
    type: 'boolean'
  },
  name: {
    default: 'Link',
    title: 'admin/category-menu.navigationLinks.sponsored.name',
    type: 'string'
  },
  url: {
    default: '',
    title: 'admin/category-menu.navigationLinks.sponsored.url',
    type: 'string'
  }
};

const ItemsSchema = {
  isExternal: {
    default: false,
    title: 'admin/category-menu.navigationLinks.sponsored.external',
    type: 'boolean'
  },
  name: {
    default: 'Link',
    title: 'admin/category-menu.navigationLinks.sponsored.name',
    type: 'string'
  },
  icon: {
    default: 'bnd-logo-pco',
    title: 'admin/category-menu.navigationLinks.sponsored.icon',
    type: 'string',
    enum: IconList
  },
  url: {
    default: '',
    title: 'admin/category-menu.navigationLinks.sponsored.url',
    type: 'string'
  }
};
export const schema = {
  title: 'admin/category-menu.navigationLinks.title',
  type: 'object',
  default: defaultPropsNavigation,
  properties: {
    links: {
      minItems: 1,
      title: 'admin/category-menu.navigationLinks.links',
      type: 'array',
      items: {
        title: 'admin/category-menu.navigationLinks.links-items',
        type: 'object',
        properties: {
          ...ItemsSchema,
          subLinks: {
            minItems: 1,
            title: 'admin/category-menu.navigationLinks.subItems.title',
            type: 'array',
            items: {
              title: 'admin/category-menu.navigationLinks.subItems',
              type: 'object',
              properties: {
                ...SubItemSchema
              }
            }
          }
        }
      }
    }
  }
};
