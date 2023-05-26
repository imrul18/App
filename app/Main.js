import React from "react";

import Dashboard from "./Dashboard.js";
import DetailsScreen from "./DetailsScreen.js";
import UploadScreen from "./UploadScreen.js";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function Main() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      initialRouteName="Dashboard" 
        screenOptions={{
            headerShown: false,
            }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Upload" component={UploadScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
