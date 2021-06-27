import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import theme from '../theme';
import * as WebBrowser from 'expo-web-browser';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 4,
  },
  intro: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  introOwner: {
    marginLeft: 16,
    marginRight: 16,
    flexDirection: 'column',
    flex: 1,
  },
  introDescription: {
    marginTop: 4,
    marginBottom: 4,
  },
  stats: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    marginLeft: 24,
    marginRight: 24,
  },
  statsNumber:{
    fontWeight: 'bold',
  },
  introChip: {
    backgroundColor: theme.button.btnPrimary,
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  introChipText: {
    color: 'white',
    fontWeight: '600',
  },
  openGithub: {
    backgroundColor: theme.button.btnPrimary,
    borderRadius: 4,
    marginTop: 16,
    padding: 16,
    alignItems: 'center',
  },
  openGithubText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
  },

});

const abb = (number) => {
  return Math.abs(number) > 999 ? Math.sign(number)*((Math.abs(number)/1000).toFixed(1)) + 'k' : Math.sign(number)*Math.abs(number);
};
const RepositoryItem = ({ props, testID, showDetail }) => {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.intro}>
        <Image style={styles.avatar} source={{uri:`${props.ownerAvatarUrl}`,}}/>
        <View style={styles.introOwner}>
          <Text fontWeight='bold'>{props.fullName}</Text>
          <Text style={styles.introDescription}>{props.description}</Text>
          <View style={styles.introChip}><Text style={styles.introChipText}>{props.language}</Text></View>
        </View>
      </View>
      
      <View style={styles.stats}>
        <View>
          <Text style={styles.statsNumber}>{abb(props.stargazersCount)}</Text>
          <Text>Stars</Text>
        </View>
        <View>
          <Text style={styles.statsNumber}>{abb(props.forksCount)}</Text>
          <Text>Forks</Text>
        </View>
        <View>
          <Text style={styles.statsNumber}>{abb(props.reviewCount)}</Text>
          <Text>Review</Text>
        </View>
        <View>
          <Text style={styles.statsNumber}>{abb(props.ratingAverage)}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      {showDetail ?
      <View>
        <Pressable style={styles.openGithub} onPress={() => WebBrowser.openBrowserAsync(props.url)}>
          <Text style={styles.openGithubText}> Open in GitHub </Text>
        </Pressable>
      </View>
      :
      null}
    </View>
  );
};


export default RepositoryItem;