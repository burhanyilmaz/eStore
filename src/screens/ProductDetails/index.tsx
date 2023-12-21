import ProductDetailsHeader from '@components/ProductDetails/ProductDetailsHeader';
import ProductInformation from '@components/ProductDetails/ProductInformation';
import { MainNavigatorParams } from '@navigators/MainNavigator';
import { RouteProp, useRoute } from '@react-navigation/native';
import productsStore from '@store/ProductStore';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

const ProductDetailsScreen = () => {
  const {
    params: { productId },
  } = useRoute<RouteProp<MainNavigatorParams, 'ProductDetails'>>();

  const {
    selectedProduct: product,
    selectedProductError: error,
    selectedProductLoading: loading,
  } = productsStore;

  const productImage = product?.images[0]?.small;

  useEffect(() => {
    productsStore.getProduct(productId);

    return () => {
      productsStore.selectedProduct = undefined;
    };
  }, [productId]);

  return (
    <View style={styles.container}>
      <ProductDetailsHeader productImage={productImage} onPressProductImage={() => null} />
      <ProductInformation product={product} loading={loading} error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default observer(ProductDetailsScreen);
