import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useHistory } from 'react-router-dom';

const useCreateReview= () => {
  const client = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const history = useHistory();
  
  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const result = await mutate({ variables: { repositoryName, ownerName, rating: Number(rating), text } });
    client.resetStore();
    history.push(`/repository/${result.data.createReview.repository.id}`);
    return result;
  };

  return [createReview, result];
};

export default useCreateReview;
