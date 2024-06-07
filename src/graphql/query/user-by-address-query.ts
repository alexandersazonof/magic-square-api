import { DocumentNode, gql } from '@apollo/client/core';

export function getUserByAddressQuery(): DocumentNode {
  return gql`
      query getUserByAddressQuery($id: String) {
          userEntities(
              where: {
                  id: $id
              }
          ) {
              id
              heroes(
                  first: 10
                  orderBy: timestamp
                  orderDirection: asc
              ) {
                  stats {
                      level
                  }
                  timestamp
              }
          }
      }
  `;
}