import { AUTHORIZED_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';

const useUserReview = ({first}) => {

  const { data, loading, fetchMore, ...result } = useQuery(AUTHORIZED_USER, {
    fetchPolicy: 'cache-and-network', variables: {first, includeReviews: true }
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        variables: {first, includeReviews: true }
      },
    });
  };
  return { 
    results: data?.authorizedUser,
    fetchMore: handleFetchMore,
    loading, ...result,
  };
};
export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const client = useApolloClient();
  const deleteReview = async (id) => {
    const result = await mutate({ variables: { id } });
    client.resetStore();
    return result;
  };
  return [deleteReview, result];
  };
export default useUserReview;
