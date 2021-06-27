import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  errorInput: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: theme.colors.error,
    padding: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: 'gray',
    padding: 16,
    marginVertical: 8,
    backgroundColor: 'white',
  }
});

const TextInput = ({error, ...props }) => {
  const textInputStyle = error ? styles.errorInput : styles.input;

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;