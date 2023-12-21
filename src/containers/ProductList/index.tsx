import ProductCard from '@components/ProductCard';
import productsStore from '@store/ProductStore';
import colors from '@theme/colors';
import { AlertTriangle } from 'lucide-react-native';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Products } from 'types/ProductTypes';

const ProductList = () => {
  const { getProducts, error, loading, paginatedProducts, increasePage } = productsStore;

  useEffect(() => {
    getProducts();
  }, []);

  const renderItem: ListRenderItem<Products> = ({ item }) => (
    <ProductCard
      title={item.title}
      price={item.price}
      onPress={() => null}
      image={item.images[0]?.small}
      category={item.categories[0].title}
    />
  );

  const ListEmptyComponent = () => <ActivityIndicator color={colors.primary} size={'large'} />;

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <AlertTriangle color={colors.error} size={48} />
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
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
