import { queries, fieldResolver } from './categoryMenu';

export const resolvers = {
  ...fieldResolver,
  Query: {
    ...queries
  }
};
