import ErrorMessage from '@components/core/ErrorMessage';
import colors from '@theme/colors';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Products } from 'types/ProductTypes';

type Props = {
  error?: string;
  loading: boolean;
  product?: Products;
};

const ProductInformation = ({ product, loading, error }: Props) => {
  const RenderProductItem = ({ title, value }: { title: string; value?: string | number }) => (
    <Text style={styles.property}>
      <Text style={styles.propertyField}>{title}: </Text> {value}
    </Text>
  );

  return (
    <View style={styles.detailsContainer}>
      {loading && !error && <ActivityIndicator color={colors.primary} />}
      {!loading && !!error && <ErrorMessage message={error} />}
      {!loading && !error && (
        <>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{product?.categories[0]?.title}</Text>
          </View>
          <View style={styles.informationContainer}>
            <View style={styles.informationTopContainer}>
              <Text style={styles.title}>{product?.title}</Text>
              <View>
                <Text style={styles.detailsText}>Details</Text>
                <RenderProductItem title="Product Brand" value={product?.brand} />
                <RenderProductItem title="Quantity" value={product?.quantity} />
                <RenderProductItem title="Taxes" value={product?.tax_percentage} />
              </View>
            </View>
            <Text style={styles.price}>AOA {product?.price}</Text>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    lineHeight: 22,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.secondary,
  },
  categoryContainer: {
    padding: 4,
    marginBottom: 8,
    borderRadius: 16,
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
  },
  categoryText: {
    color: 'white',
  },
  price: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  detailsText: {
    marginVertical: 6,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.primary,
  },
  property: {
    marginBottom: 4,
    fontWeight: '500',
  },
  propertyField: {
    opacity: 0.6,
  },
  detailsContainer: {
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
  },
  informationContainer: { flexDirection: 'row', flex: 1 },
  informationTopContainer: { marginRight: 8, flex: 1 },
});

export default ProductInformation;
