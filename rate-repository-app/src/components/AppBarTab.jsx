import React from 'react';
import { View, Pressable, ScrollView, StyleSheet } from 'react-native';
import Text from './Text';
import { useHistory } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  tabStyle: {
    marginHorizontal: 8,
    marginVertical: 16
  }
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const token = authStorage.getAccessToken();
  const authorized = useQuery(AUTHORIZED_USER, { Authorization: `Beaer ${token}` });
  const client = useApolloClient();
  const history = useHistory();

  const signOut = () => {
    authStorage.removeAccessToken();
    client.resetStore();
  };

  return (
    <View>
      <ScrollView horizontal>
        <Pressable onPress={() => { history.push('/repositories'); }}>
            <Text style={styles.tabStyle} color='textSecondary' fontWeight='bold' fontSize='subheading'>Repositories </Text>
        </Pressable>
        
        {
          !authorized.loading && authorized.data.authorizedUser ?
            <>
            <Pressable onPress={() => history.push('/newreview')}>
              <Text style={styles.tabStyle} color='textSecondary' fontWeight='bold' fontSize='subheading'>Create a Review </Text>
            </Pressable>
            <Pressable onPress={() => history.push('/myreview')}>
              <Text style={styles.tabStyle} color='textSecondary' fontWeight='bold' fontSize='subheading'>My Reviews </Text>
            </Pressable>
            <Pressable onPress={()=>signOut()}>
                <Text style={styles.tabStyle} color='textSecondary' fontWeight='bold' fontSize='subheading'>Sign Out</Text>
            </Pressable>
            </>
          :
            <>
            <Pressable onPress={()=>history.push('/signin')}>
                <Text style={styles.tabStyle} color='textSecondary' fontWeight='bold' fontSize='subheading'>Sign In</Text>
            </Pressable>
            <Pressable onPress={()=>history.push('/signup')}>
                <Text style={styles.tabStyle} color='textSecondary' fontWeight='bold' fontSize='subheading'>Sign Up</Text>
            </Pressable>
            </>
        }
          
        
      </ScrollView>
      
    </View>
  );
};

export default AppBar;