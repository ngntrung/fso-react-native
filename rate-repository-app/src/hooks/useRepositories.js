import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client';

const useRepositories = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });
  if (loading){
    return loading;
  }
  const repositories = data.repositories;

  return { repositories, error, loading};
};

export default useRepositories;