import ProductCard from '@components/ProductCard';
import ErrorMessage from '@components/core/ErrorMessage';
import { MainNavigatorParams } from '@navigators/MainNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import productsStore from '@store/ProductStore';
import colors from '@theme/colors';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { Products } from 'types/ProductTypes';

const ProductList = () => {
  const { navigate } = useNavigation<NavigationProp<MainNavigatorParams>>();
  const { getProducts, error, loading, paginatedProducts, increasePage } = productsStore;

  useEffect(() => {
    getProducts();
  }, []);

  const renderItem: ListRenderItem<Products> = ({ item }) => (
    <ProductCard
      title={item.title}
      price={item.price}
      image={item.images[0]?.small}
      category={item.categories[0].title}
      onPress={() => navigate('ProductDetails', { productId: item.id })}
    />
  );

  const keyExtractor = (item: Products) => item.id.toString();

  const ListEmptyComponent = () => <ActivityIndicator color={colors.primary} size={'large'} />;

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <FlatList
      numColumns={2}
      windowSize={Platform.select({
        ios: 10,
        android: 5,
      })}
      initialNumToRender={Platform.select({
        ios: 10,
        android: 5,
      })}
      maxToRenderPerBatch={Platform.select({
        ios: 15,
        android: 8,
      })}
      removeClippedSubviews
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onEndReached={increasePage}
      data={paginatedProducts || []}
      ListEmptyComponent={ListEmptyComponent}
      columnWrapperStyle={styles.columnWrapper}
      refreshControl={
        <RefreshControl
          onRefresh={getProducts}
          tintColor={colors.primary}
          refreshing={paginatedProducts.length > 0 && loading}
        />
      }
    />
  );
};

const styles = StyleSheet.create({
  columnWrapper: { justifyContent: 'space-evenly', marginBottom: 16 },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    margin: 16,
    fontSize: 16,
    fontWeight: '500',
    color: colors.error,
  },
});

export default observer(ProductList);
