import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Onboarding from '../screens/Onboarding';
import Login from '../screens/Login';
import Url from '../screens/Url';

const Stack = createStackNavigator();

const AuthStack = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Url" component={Url} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;