import { gql } from '@apollo/client';

export const REPOSITORY_DETAILS = gql `
  fragment Details on Repository {
    id
    fullName
    ownerAvatarUrl
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
`;

export const USER_DETAILS = gql `
  fragment UserDetails on User {
    id
    username
    createdAt
    reviewCount
    reviews{
      edges{
        node{
          text
          rating
          createdAt
          id
        }
      }
    }
  }
`;
