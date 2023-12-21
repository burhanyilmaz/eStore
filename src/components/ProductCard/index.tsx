import colors from '@theme/colors';
import { ImageOff } from 'lucide-react-native';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  title: string;
  price: string;
  image: string;
  category: string;
  onPress: () => void;
};

const ProductCard = ({ title, price, image, category, onPress }: Props) => (
  <Pressable onPress={onPress} style={styles.card}>
    {image ? (
      <Image style={styles.image} source={{ uri: image }} resizeMode="contain" />
    ) : (
      <View style={styles.imageOff}>
        <ImageOff size={80} strokeWidth={1} color={colors.accent} />
      </View>
    )}
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
      </View>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.price}>
        <Text style={styles.currency}>AOA</Text> {price}
      </Text>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  card: {
    padding: 8,
    borderRadius: 14,
    width: (Dimensions.get('window').width - 48) / 2,
    backgroundColor: 'white',
  },
  image: {
    height: 140,
    width: '100%',
    borderRadius: 14,
    marginBottom: 16,
  },
  imageOff: {
    height: 140,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    height: 52,
  },
  title: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.secondary,
  },
  category: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: '400',
    marginBottom: 20,
    color: colors.accent,
  },
  currency: {
    color: colors.lightPrimary,
  },
  price: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '500',
    color: colors.primary,
  },
});

export default ProductCard;
