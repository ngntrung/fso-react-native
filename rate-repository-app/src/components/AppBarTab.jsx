import React from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const AppBar = () => {
  return (
    <View>
      <ScrollView horizontal>
        <Pressable onPress={()=>console.log('tab pressed')}>
          <Link to='/repository'>
            <Text style={{ margin: 16 }} color='textSecondary' fontWeight='bold' fontSize='subheading'>Repository </Text>
          </Link>
        </Pressable>
        <Pressable onPress={()=>console.log('tab pressed')}>
          <Link to='/signin'>
            <Text style={{ margin: 16 }} color='textSecondary' fontWeight='bold' fontSize='subheading'>Sign In</Text>
          </Link>
        </Pressable>
      </ScrollView>
      
    </View>
  );
};

export default AppBar;