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
          }
      }
  `;
}