import { gql } from '@apollo/client';
import { REPOSITORY_DETAILS, USER_DETAILS } from './fragments';

export const LOGIN = gql`
  mutation authorize($username: String!, $password: String!){
    authorize(credentials: { username: $username, password: $password}){
      accessToken
    }
  }
`;
export const SIGN_UP = gql `
  mutation createUser($username: String!, $password: String!){
    createUser(user: { username: $username, password: $password}){
      ...UserDetails
    }
  }
  ${ USER_DETAILS }
`;
export const CREATE_REVIEW = gql `
  mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text:String){
    createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text}){
      repository {
        ...Details
      }
    }
  }
  ${ REPOSITORY_DETAILS }
`;

export const DELETE_REVIEW = gql `
  mutation deleteReview($id: ID!){
    deleteReview(id:$id)
  }
`;