import React from 'react';
import { format } from 'date-fns';
import { View, StyleSheet, Pressable, Alert } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDeleteReview } from '../hooks/useUserReviews';
import Text from './Text';
import theme from '../theme';
const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
  },
  reviewUser: {
    fontWeight: theme.fontWeights.bold,
  },
  createdAt: {
    marginTop: 4,
    color: theme.colors.gray,
  },
  reviewHeader: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
  },
  reviewHeaderRight: {
    marginHorizontal: 16,
  },
  ratingContainer: {
    width: 48,
    height: 48,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 40,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: 24,
  },
  reviewActions: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  reviewActionView: {
    padding: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    flexShrink: 1 ,
    flexGrow: 1,
    marginRight: 8,
  },
  reviewActionDelete: {
    padding: 16,
    backgroundColor: theme.colors.error,
    borderRadius: 4,
    flexShrink: 1,
    flexGrow: 1,
    marginLeft: 8,
  },
  reviewActionText: {
    color: 'white',
    fontWeight: theme.fontWeights.bold,
    alignSelf: 'center',
  }
});
const deleteReviewAlert = (id, deleteReview) =>{
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => deleteReview(id) }
      ]
    );
};
  

const RepositoryReviewItem = ({review, myReview}) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();
  
  return (
    <View style={styles.container}>
      <View style={styles.reviewHeader}>
        <View style={styles.ratingContainer}>
          <Text style={ styles.rating }>{review.rating}</Text>
        </View>
        <View style={styles.reviewHeaderRight}>
          <Text style={styles.reviewUser}>{ myReview ? review.repository.fullName :review.user.username }</Text>
          <Text style={styles.createdAt}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        </View>
      </View>
      <Text>{review.text}</Text>
      {
        myReview ? 
        <View style={ styles.reviewActions }>
          <Pressable style={ styles.reviewActionView } onPress={() => history.push(`/repository/${review.repository.id}`)}><Text style={ styles.reviewActionText }>View Repository</Text></Pressable>
          <Pressable style={ styles.reviewActionDelete }  onPress={() => deleteReviewAlert(review.id, deleteReview)}><Text style={ styles.reviewActionText }>Delete Review</Text></Pressable>
        </View>
        :
        null 
      }
    </View>
  );
};

export default RepositoryReviewItem;