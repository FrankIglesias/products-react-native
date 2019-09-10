import React from 'react';
import {View, Text, FlatList, SafeAreaView} from 'react-native';
import {useQuery} from '@apollo/react-hooks';
import {gql} from 'apollo-boost';

import styles from './styles';

function ProductsList() {
  const {loading, data, error, fetchMore} = useQuery(
    gql`
      query Product($page: Int, $limit: Int) {
        products(page: $page, limit: $limit) {
          products {
            name
            id
            brand
          }
          next_page
        }
      }
    `,
    {
      variables: {
        page: 1,
        limit: 3,
      },
    },
  );
  if (loading) {
    return <Text>loading....</Text>;
  }

  const loadMore = () => {
    fetchMore({
      variables: {
        page: data.products.next_page,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          products: {
            ...fetchMoreResult.products,
            products: [
              ...prev.products.products,
              ...fetchMoreResult.products.products,
            ],
          },
        };
      },
    });
  };
  return (
    <SafeAreaView>
      <FlatList
        data={data.products.products}
        keyExtractor={product => product.id}
        renderItem={({item: product}) => (
          <View style={styles.product}>
            <Text>{product.name}</Text>
            <Text>{product.brand}</Text>
          </View>
        )}
        onEndReached={loadMore}
      />
    </SafeAreaView>
  );
}

export default ProductsList;
