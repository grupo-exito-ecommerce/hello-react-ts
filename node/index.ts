import { Service } from '@vtex/api';
import { clients, Clients } from './dataSources';
import { resolvers } from './resolvers';

export default new Service<Clients>({
  clients,
  graphql: {
    resolvers,
  },
});
