import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation authorize($username: String!, $password: String!){
    authorize(credentials: { username: $username, password: $password}){
      accessToken
    }
  }
`;