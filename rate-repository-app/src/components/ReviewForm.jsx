import React from 'react';
import { Pressable, View } from 'react-native';
import FormikTextInput from './FormikTextInput';
import Text from './Text';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  repositoryOwner: '',
  repositoryName: '',
  rating: '',
  review: '',
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
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
  .number()
  .integer()
  .min(0)
  .max(100)
  .required('Rating is required'),
  text: yup
  .string()
});
export const ReviewInput = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
    {({ handleSubmit }) => (
      <View style={styles.container}>
        <FormikTextInput name='ownerName' placeholder='Repository owner name' />
        <FormikTextInput name='repositoryName' placeholder='Repository name' />
        <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
        <FormikTextInput name='text' placeholder='Review' multiline/>
        <Pressable onPress={handleSubmit} style={styles.submitButton} >
          <Text style={styles.submitBtnText}>Create a review</Text>
        </Pressable>
      </View>
    )}
    </Formik>
      
  );
};

const ReviewForm = () => {
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;

    try {
      const { data } = await createReview({ ownerName, repositoryName, rating, text });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ReviewInput onSubmit={onSubmit} />
  );
};

export default ReviewForm;

