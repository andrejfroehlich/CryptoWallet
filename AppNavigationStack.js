import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import HomeScreenCrypto from "./components/HomeScreenCrypto";
import HomeScreenWallet from "./components/HomeScreenWallet";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerMode: "none",
          navigationOptions: {
            headerVisible: false,
          },
        }}
      >
        <Stack.Screen
          name="HomeScreenWallet"
          component={HomeScreenWallet}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreenCrypto"
          component={HomeScreenCrypto}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
