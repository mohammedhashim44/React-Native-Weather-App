import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import tabs from "./Tabs";
import AppColors from "../theme/Colors";

const Tab = createBottomTabNavigator();

const TabApp = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.tabColors.activeTintColor,
        tabBarInactiveTintColor: AppColors.tabColors.inactiveTintColor,
        tabBarStyle: {
          backgroundColor: AppColors.tabColors.backgroundColor,
        },
      }}
    >
      {tabs.map((t, _) => (
        <Tab.Screen
          key={t.name}
          name={t.name}
          component={t.component as any}
          options={{
            tabBarIcon: ({ color, size }) => t.icon(color),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default TabApp;
