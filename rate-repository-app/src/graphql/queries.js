import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String){
    repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
      totalCount
      edges{
        node {
          ...Details
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const SINGLE_REPOSITORY = gql`
  query repository($id: ID!, $first: Int, $after: String){
    repository(id: $id) {
      ...Details
      reviews (first: $first, after: $after) {
        totalCount
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;


export const AUTHORIZED_USER = gql `
  query authorizedUser($includeReviews: Boolean = false, $first: Int){
    authorizedUser {
      id
      username
      reviews(first:$first)@include(if: $includeReviews){
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              id
              fullName
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;