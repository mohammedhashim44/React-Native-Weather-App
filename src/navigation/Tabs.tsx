import { Ionicons } from "@expo/vector-icons";
import React from "react";

import TABS_ENUM from "./TabsEnum";
import AboutScreen from "../screens/AboutScreen/AboutScreen";
import CitiesScreen from "../screens/CitiesScreen/CitiesScreen";
import HomeScreen from "../screens/HomeScreen/HomeScreen";

interface ITab {
  name: string;
  component: any;
  icon(color: string): JSX.Element;
}

const tabs: ITab[] = [
  {
    name: TABS_ENUM.HOME,
    component: HomeScreen,
    icon: (color) => <Ionicons name="md-home" size={20} color={color} />,
  },
  {
    name: TABS_ENUM.CITIES,
    component: CitiesScreen,
    icon: (color) => <Ionicons name="md-people" size={20} color={color} />,
  },
  {
    name: TABS_ENUM.ABOUT,
    component: AboutScreen,
    icon: (color) => (
      <Ionicons name="md-information-circle" size={20} color={color} />
    ),
  },
];

export default tabs;
