import Header from '@components/core/Header';
import colors from '@theme/colors';
import { HeartIcon, ImageOff } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, StyleSheet, View } from 'react-native';

type Props = {
  productImage?: string;
  onPressProductImage: () => void;
};

const ProductDetailsHeader = ({ productImage, onPressProductImage }: Props) => (
  <>
    <Header showBackIcon rightComponent={<HeartIcon color="black" />} />
    {productImage ? (
      <Pressable style={styles.imageContainer} onPress={onPressProductImage}>
        <Image resizeMode="contain" style={styles.image} source={{ uri: productImage }} />
      </Pressable>
    ) : (
      <View style={styles.imageOff}>
        <ImageOff size={250} strokeWidth={0.5} color={colors.accent} />
      </View>
    )}
  </>
);

const styles = StyleSheet.create({
  imageContainer: { paddingBottom: 16 },
  image: {
    height: 250,
    width: '100%',
  },
  imageOff: {
    height: 200,
    width: '100%',
    paddingTop: 8,
    paddingBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductDetailsHeader;
