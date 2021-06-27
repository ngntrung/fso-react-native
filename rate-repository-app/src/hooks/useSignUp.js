import { useMutation } from '@apollo/client';
import { SIGN_UP} from '../graphql/mutations';
import { useHistory } from 'react-router-dom';


const useSignUp = () => {
  const [mutate, result] = useMutation(SIGN_UP);
  const history = useHistory();
  
  const signUp = async ({ username, password }) => {
    const result = await mutate({ variables: { username, password } });
    history.push('/signin');
    return result;
  };

  return [signUp, result];
};

export default useSignUp;
