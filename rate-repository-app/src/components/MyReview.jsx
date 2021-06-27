import React from 'react';
import useUserReview from '../hooks/useUserReviews';
import RepositoryReviewItem from '../components/RepositoryReviewItem';
import { View, FlatList, StyleSheet } from 'react-native';
import Text from './Text'; 

const styles = StyleSheet.create({
  separator: {
    height: 8,
    
  },
});



const ItemSeparator = () => <View style={styles.separator} />;
const MyReview = () => {
  const { results, fetchMore, loading} = useUserReview({first: 8});
  if (loading) {
    return <View><Text>loading...</Text></View>;
  }
  const onEndReach = () => {
    fetchMore();
  };
  const reviews = results.reviews.edges.map((edge) => edge.node);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <RepositoryReviewItem review={item} myReview />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      // ...
    />
  );
};

export default MyReview;