export interface ItemsType {
  name: string;
  url?: string;
  isExternal?: boolean;
  icon?: string;
  id?: string;
}

export interface ItemsList extends ItemsType {
  subLinks: ItemsType[];
}

export interface NavigationProps {
  links: ItemsList[];
}
