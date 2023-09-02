import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import React from "react";

import TabApp from "./navigation/TabApp";
import SearchCityScreen from "./screens/SearchCityScreen/SearchCityScreen";

const queryClient = new QueryClient();
const rootStack = createNativeStackNavigator();

export default function MyApp() {
  const [fontsLoaded] = useFonts({
    montserrat: require("../assets/fonts/Montserrat/Montserrat-Regular.ttf"),
    montserrat_bold: require("../assets/fonts/Montserrat/Montserrat-Bold.ttf"),
    montserrat_thin: require("../assets/fonts/Montserrat/Montserrat-Thin.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <rootStack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <rootStack.Screen name="TabApp" component={TabApp} />
          <rootStack.Screen name="SearchCity" component={SearchCityScreen} />
        </rootStack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
