import { useMutation, useApolloClient } from '@apollo/client';
import { LOGIN } from '../graphql/mutations';
import { useHistory } from 'react-router-dom';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const [mutate, result] = useMutation(LOGIN);
  const history = useHistory();
  
  const signIn = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });
    authStorage.setAccessToken(result.data.authorize.accessToken);
    client.resetStore();
    history.push('/repositories');
    return result;
  };

  return [signIn, result];
};

export default useSignIn;
