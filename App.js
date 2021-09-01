import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from "./components/Main";
import Event from "./components/Event";
import { View, Text } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="event" component={Event} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
