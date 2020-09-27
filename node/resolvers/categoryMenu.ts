import { result } from 'lodash';
import { ApiConfigInput, Context, ICategories } from '../shared';

export const queries = {
  getCategoryMenu: (_: any, { config }: { config: ApiConfigInput }, { clients }: Context) =>
    clients.categoryMenu.getCategoryMenu(config)
};

export const fieldResolver = {
  ApiResponse: {
    status: (o: any) => result<string>(o, 'status'),
    message: (o: any) => result<string>(o, 'message'),
    fileName: (o: any) => result<string>(o, 'fileName'),
    data: (o: any) => result<ICategories>(o, 'data')
  }
};
