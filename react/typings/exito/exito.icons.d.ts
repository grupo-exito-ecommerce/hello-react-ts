declare module 'exito.icons' {
  import { ReactElement, Component, ComponentType } from 'react';

  export interface IconModel {
    icon: string;
    size?: string;
    color?: string;
    viewBox?: string;
  }
  export const Icon: ComponentType<IconModel>;
  export const App: ReactElement<any>;
  export const IconList: ReactElement<any>;
}
