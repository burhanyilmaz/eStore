import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import HomeScreen from '@screens/Home';
import ProductDetailsScreen from '@screens/ProductDetails';
import React from 'react';

export type MainNavigatorParams = {
  Home: undefined;
  ProductDetails: { productId: number };
};

const Stack = createNativeStackNavigator<MainNavigatorParams>();

const commonOptions: NativeStackNavigationOptions = {
  headerShown: false,
};

function MainNavigator() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={commonOptions} name="Home" component={HomeScreen} />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetailsScreen}
            options={{ ...commonOptions, animation: 'slide_from_right' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default MainNavigator;
