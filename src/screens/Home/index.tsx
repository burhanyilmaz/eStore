import Logo from '@components/Logo';
import ProductList from '@containers/ProductList';
import colors from '@theme/colors';
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

const HomeScreen = () => (
  <SafeAreaView style={styles.container}>
    <Logo />
    <ProductList />
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});

export default HomeScreen;
