import React from 'react';
import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { Redirect, Route, Switch } from 'react-router-native';
import SignIn from './SignIn';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});
const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path="/repository" exact>
          <RepositoryList/>
        </Route>
        <Route path="/signin" exact>
          <SignIn/>
        </Route>
        <Redirect to='/repository'></Redirect>
      </Switch>
    </View>
  );
};

export default Main;