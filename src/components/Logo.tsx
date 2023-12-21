import colors from '@theme/colors';
import { ShoppingBag } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Logo = () => (
  <View style={styles.container}>
    <ShoppingBag color={colors.primary} size={40} />
    <Text style={styles.text}>
      <Text style={styles.highlightText}>e</Text>Store
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
    alignContent: 'center',
    flexDirection: 'row',
  },
  text: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 32,
    lineHeight: 40,
    marginLeft: 4,
  },
  highlightText: {
    color: colors.primary,
  },
});
export default Logo;
