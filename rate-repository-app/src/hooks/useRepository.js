import { SINGLE_REPOSITORY } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepository = ({id, first}) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(SINGLE_REPOSITORY, {
    fetchPolicy: 'cache-and-network', variables: { id, first }
  });
  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        variables: { id, first }
      },
    });
  };
  return { 
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading, ...result,
  };
};

export default useRepository;