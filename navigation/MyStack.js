import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home, Play } from "../screens";

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Play" component={Play} />
    </Stack.Navigator>
  );
};

export default MyStack;
