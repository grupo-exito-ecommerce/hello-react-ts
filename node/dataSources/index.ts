import { CategoryMenuDataSource } from './categoryMenu';
import { AuthType, ClientsConfig, IOClients, LRUCache } from '@vtex/api';

const memoryCache = new LRUCache<string, any>({ max: 5000 });
metrics.trackCache('equalizer-points', memoryCache);

const defaultClientOptions = {
  retries: 1,
  timeout: 20000
};
const clientOptions = {
  memoryCache,
  authType: AuthType.bearer
};

export class Clients extends IOClients {
  get categoryMenu() {
    return this.getOrSet('categoryMenu', CategoryMenuDataSource);
  }
}

export const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: defaultClientOptions,
    categoryMenu: clientOptions
  }
};
