import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Roll from './pages/Roll';
import Images from './pages/Images';
const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>

      <AppStack.Navigator screenOptions={{ headerShown: false }} >
        <AppStack.Screen name="Images"  component={Images} />
        <AppStack.Screen name="Roll"  component={Roll} />
      </AppStack.Navigator>

    </NavigationContainer>
  );
}