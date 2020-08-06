export interface ICategoryMenu {
  id: number;
  name: string;
  href: string;
  slug: string;
  icon: string | null;
  parent: number | null;
  styles: string | null;
  showIconLeft: boolean | null;
  showIconRight: boolean | null;
  categoryId: string | null;
  enable: boolean | null;
}
