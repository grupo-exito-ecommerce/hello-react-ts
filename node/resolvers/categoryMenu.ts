import { result } from 'lodash';
import { Context, ICategories } from '../shared';

export const queries = {
  getCategoryMenu: (_: any, __: any, { clients }: Context) => clients.categoryMenu.getCategoryMenu()
};

export const fieldResolver = {
  ApiResponse: {
    status: (o: any) => result<string>(o, 'status'),
    message: (o: any) => result<string>(o, 'message'),
    fileName: (o: any) => result<string>(o, 'fileName'),
    data: (o: any) => result<ICategories>(o, 'data')
  }
};
