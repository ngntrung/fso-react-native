import React from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const AppBar = () => {
  const authStorage = useAuthStorage();
  const token = authStorage.getAccessToken();
  const authorized = useQuery(AUTHORIZED_USER, { Authorization: `Beaer ${token}` });
  const client = useApolloClient();

  const signOut = () => {
    authStorage.removeAccessToken();
    client.resetStore();
  };

  return (
    <View>
      <ScrollView horizontal>
        <Pressable onPress={()=>console.log('tab pressed')}>
          <Link to='/repository'>
            <Text style={{ margin: 16 }} color='textSecondary' fontWeight='bold' fontSize='subheading'>Repository </Text>
          </Link>
        </Pressable>
        
        {
          !authorized.loading && authorized.data.authorizedUser?
            <Pressable onPress={()=>signOut()}>
                <Text style={{ margin: 16 }} color='textSecondary' fontWeight='bold' fontSize='subheading'>Sign Out</Text>
            </Pressable>
          :
            <Pressable onPress={()=>console.log('tab pressed')}>
              <Link to='/signin'>
                  <Text style={{ margin: 16 }} color='textSecondary' fontWeight='bold' fontSize='subheading'>Sign In</Text>
              </Link>
            </Pressable>
        }
          
        
      </ScrollView>
      
    </View>
  );
};

export default AppBar;