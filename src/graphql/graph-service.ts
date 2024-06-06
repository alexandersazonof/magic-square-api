import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client/core';
import { UserEntity } from '../../generated/gql';
import { getUserByAddressQuery } from './query/user-by-address-query';

export function createClient(url: string) {
  return new ApolloClient({
    link: createHttpLink({
      uri: url,
      fetch,
    }),
    cache: new InMemoryCache({
      resultCaching: false,
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    },
  });
}


export async function getUserByAddress(address: string): Promise<UserEntity[]> {
  const client = createClient(getSubgraphUrl() ?? 'no_url');

  const { data } = await client.query({
    query: getUserByAddressQuery(),
    variables: { id: address },
  });

  return data.userEntities ?? [];
}


function getSubgraphUrl() {
  return process.env.SUBGRAPH_URL;
}