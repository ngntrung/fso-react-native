import React from 'react';
import { Pressable, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignin';

const initialValues = {
  username: '',
  password: '',
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  submitButton: {
    borderRadius: 4,
    padding: 12,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: theme.button.btnPrimary,
    marginVertical: 8,
  },
  submitBtnText:{
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.textSecondary,
  }

};
const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});
export const SignInInput = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => (
      <View style={styles.container}>
        <FormikTextInput name='username' placeholder='Username' testID='usernameInput'/>
        <FormikTextInput name='password' placeholder='Password' secureTextEntry testID='passwordInput'/>
        <Pressable onPress={handleSubmit} style={styles.submitButton} testID='submitBtn'>
          <Text style={styles.submitBtnText}>Sign in</Text>
        </Pressable>
      </View>
    )}
    </Formik>
      
  );
};

const SignInForm = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SignInInput onSubmit={onSubmit} />
  );
};

export default SignInForm;

