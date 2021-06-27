import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { Menu, Searchbar } from 'react-native-paper';
import { useParams, useHistory } from 'react-router-native';
import Text from '../components/Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import useRepository from '../hooks/useRepository';
import RepositoryReviewItem from './RepositoryReviewItem';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  menuSelector: {
    paddingHorizontal: 16,
  },
  menuSelectorText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItem: {
    padding: 16,
  }
});



const ItemSeparator = () => <View style={styles.separator} />;

const SearchBar = ({ setSearchQuery, searchQuery }) => {
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={{
      paddingHorizontal: 12,
    }}>
      <Searchbar placeholder='Type in to search' onChangeText={ onChangeSearch } value= { searchQuery } />
    </View>
  );
};
const RepositorySorting = ({ setOrderBy, setOrderDirection }) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const closeMenu = () => setMenuVisibility(false);

  return (
      <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          paddingVertical: 12,
        }}>
        
        <Menu visible={ menuVisibility } onDismiss={ closeMenu } anchor={ 
          <Pressable style={styles.menuSelector} onPress={() => setMenuVisibility(true)}><Text color='primary' fontWeight='bold' fontSize='subheading'>Select an item...</Text></Pressable>
          }>
          
          <Pressable style={styles.menuItem} onPress={() => { setOrderBy('CREATED_AT'); setOrderDirection('DESC'); closeMenu(); }}><Text>Latest repositories</Text></Pressable>
          <Pressable style={styles.menuItem} onPress={() => { setOrderBy('RATING_AVERAGE'); setOrderDirection('DESC'); closeMenu(); }}><Text>Highest rated repositories</Text></Pressable>
          <Pressable style={styles.menuItem} onPress={() => { closeMenu(); setOrderBy('RATING_AVERAGE'); setOrderDirection('ASC');}}><Text>Lowest rated repositories</Text></Pressable>

        </Menu>
      </View>
  );
};


export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
        <SearchBar setSearchQuery= { props.setSearchQuery } searchQuery= { props.searchQuery } />
        <RepositorySorting setOrderBy = { props.setOrderBy } setOrderDirection= { props.setOrderDirection }/>
      </View>
    );
  };

  render(){
    const repositoryNodes = this.props.repositories
      ? this.props.repositories.edges.map((edge) => edge.node)
      : [];
    const renderItem = ({item}) => (
      <Pressable onPress={() => {this.props.history.push(`/repository/${item.id}`);} }>
        <RepositoryItem testID='repositoryItem' props={item}/>
      </Pressable>
    );
    return (
        <>
        <FlatList
          data={ repositoryNodes }
          ItemSeparatorComponent={ItemSeparator}
          renderItem={ renderItem }
          ListHeaderComponent={this.renderHeader}
          onEndReached={this.props.onEndReach}
          onEndReachedThreshold={0.5}
          // other props
        />
        </>
      );
    }
}

export const RepositoryDetail = () => {
  const { slug } = useParams();
  const { repository, fetchMore } = useRepository({ id: slug, first: 5});
  const onEndReach = () => {
    fetchMore();
  };
  if (!repository) {
    return <View><Text>loading...</Text></View>;
  }
  const reviews = repository.reviews.edges.map((edge) => edge.node);
  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <RepositoryReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem props={ repository } showDetail/>}
      ItemSeparatorComponent={ItemSeparator}
      stickyHeaderIndices={[0]}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      // ...
    />
  );
  
};
const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const history = useHistory();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchKeyword] = useDebounce(searchQuery, 500);

  const { repositories, fetchMore } = useRepositories({ orderBy, orderDirection, searchKeyword, first: 8 });

  const onEndReach = () => {
    fetchMore();
  };
  
  return <RepositoryListContainer repositories={ repositories } setOrderBy={ setOrderBy } setOrderDirection={ setOrderDirection } 
  searchQuery={ searchQuery } setSearchQuery={ setSearchQuery } history={ history } onEndReach={ onEndReach } />;
};

export default RepositoryList;