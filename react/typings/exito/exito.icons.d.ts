declare module 'exito.icons' {
  import { ReactElement } from 'react';
  export const Icon: ReactElement<IconModel>;
  export const App: ReactElement<any>;
  export const IconList: ReactElement<any>;
}
interface IconModel {
  icon: string;
  size?: string;
  color?: string;
  viewBox?: string;
}
