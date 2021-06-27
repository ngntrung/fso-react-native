import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList, { RepositoryDetail } from './RepositoryList';
import AppBar from './AppBar';
import { Redirect, Route, Switch } from 'react-router-native';
import SignIn from './SignIn';
import ReviewForm from './ReviewForm';
import theme from '../theme';
import SignUpForm from './SignUpForm';
import MyReview from './MyReview';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.gray,
  },
});
const Main = () => {

  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/repositories" exact>
          <RepositoryList/>
        </Route>
        <Route path="/signin" exact>
          <SignIn/>
        </Route>
        <Route path="/newreview" exact>
          <ReviewForm/>
        </Route>
        <Route path="/repository/:slug" exact>
          <RepositoryDetail />
        </Route>
        <Route path="/signup" exact>
          <SignUpForm />
        </Route>
        <Route path="/myreview">
          <MyReview />
        </Route>
        <Redirect to='/repositories'></Redirect>
      </Switch>
    </View>
  );
};

export default Main;