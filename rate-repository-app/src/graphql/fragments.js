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
  }
`;