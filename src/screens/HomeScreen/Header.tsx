import React from "react";
import { View } from "react-native";

import AppText from "../../components/AppText";
import WeatherIconAndDesc from "../../components/WeatherIcon/WeatherIconAndDesc";
import { TodaySummary } from "../../models/WeatherData";

const Header = (props: { todaySummary: TodaySummary }) => {
  return (
    <View className="flex flex-col justify-center items-center">
      <AppText className="text-3xl">{props.todaySummary.city}</AppText>
      <View style={{ height: 20 }} />
      <AppText className="text-8xl">{props.todaySummary.currentTemp}°</AppText>
      <WeatherIconAndDesc
        weatherCode={props.todaySummary.weatherCode}
        hideIcon
      />
      <View style={{ height: 10 }} />
      <View className="flex flex-row gap-x-4">
        <AppText className="text-lg" isBold>
          H: {props.todaySummary.minTemp}°
        </AppText>
        <AppText className="text-lg" isBold>
          L: {props.todaySummary.maxTemp}°
        </AppText>
      </View>
    </View>
  );
};

export default Header;
