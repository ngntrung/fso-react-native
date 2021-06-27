import React from 'react';
import { Pressable, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignUp from '../hooks/useSignUp';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
};

const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    paddingTop: 8,
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
    .min(1)
    .max(30)
    .required('Username is required'),
  password: yup
    .string()
    .min(5)
    .max(50)
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required('Password confirm is required')
});
export const SignUpInput = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => (
      <View style={styles.container}>
        <FormikTextInput name='username' placeholder='Username' testID='usernameInput'/>
        <FormikTextInput name='password' placeholder='Password' secureTextEntry testID='passwordInput'/>
        <FormikTextInput name='passwordConfirm' placeholder='Password confirmation' secureTextEntry testID='passwordConfirmInput'/>
        <Pressable onPress={handleSubmit} style={styles.submitButton} testID='submitBtn'>
          <Text style={styles.submitBtnText}>Sign up</Text>
        </Pressable>
      </View>
    )}
    </Formik>
      
  );
};

const SignUpForm = () => {
  const [signUp] = useSignUp();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signUp({ username, password });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <SignUpInput onSubmit={onSubmit} />
  );
};

export default SignUpForm;

