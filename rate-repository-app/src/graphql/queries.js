import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  {
    repositories {
      edges{
        node {
          ...Details
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const AUTHORIZED_USER = gql `
  {
    authorizedUser {
      id
      username
    }
  }
`;