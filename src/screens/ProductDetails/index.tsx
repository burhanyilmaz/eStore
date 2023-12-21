import ProductDetailsHeader from '@components/ProductDetails/ProductDetailsHeader';
import ProductImagePreview from '@components/ProductDetails/ProductImagePreview';
import ProductInformation from '@components/ProductDetails/ProductInformation';
import { MainNavigatorParams } from '@navigators/MainNavigator';
import { RouteProp, useRoute } from '@react-navigation/native';
import productsStore from '@store/ProductStore';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const ProductDetailsScreen = () => {
  const {
    params: { productId },
  } = useRoute<RouteProp<MainNavigatorParams, 'ProductDetails'>>();
  const [visiblePreview, setVisiblePreview] = useState(false);

  const {
    selectedProduct: product,
    selectedProductError: error,
    selectedProductLoading: loading,
  } = productsStore;

  const productImage = product?.images[0]?.small;
  const largeProductImage = product?.images[0]?.large;

  useEffect(() => {
    productsStore.getProduct(productId);

    return () => {
      productsStore.selectedProduct = undefined;
    };
  }, [productId]);

  const onPressProductImage = () => {
    if (productImage || largeProductImage) {
      setVisiblePreview(true);
    }
  };

  const onCloseProductImagePreview = () => {
    setVisiblePreview(false);
  };

  return (
    <View style={styles.container}>
      <ProductDetailsHeader productImage={productImage} onPressProductImage={onPressProductImage} />
      <ProductInformation product={product} loading={loading} error={error} />
      <ProductImagePreview
        visiblePreview={visiblePreview}
        onClose={onCloseProductImagePreview}
        productImage={largeProductImage || productImage}
      />
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
