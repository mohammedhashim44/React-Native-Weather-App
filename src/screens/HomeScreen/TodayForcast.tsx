import React from "react";
import { FlatList, View } from "react-native";

import { AppCard } from "../../components/AppCard";
import AppText from "../../components/AppText";
import WeatherIconAndDesc from "../../components/WeatherIcon/WeatherIconAndDesc";
import { HourlyForcast } from "../../models/WeatherData";

const TodayForcast = (props: { hours: HourlyForcast[] }) => {
  const getRelevantHours = (hours: HourlyForcast[]) => {
    const now = new Date();
    let relevantHours = hours.filter((h) => {
      const hourDate = new Date(h.time);

      // this to include any future hours
      if (hourDate >= now) {
        return true;
      } else {
        // this to include current hour
        // check if dates are equal
        // and hours are equal
        if (
          hourDate.getMonth() === now.getMonth() &&
          hourDate.getDate() === now.getDate() &&
          hourDate.getHours() === now.getHours()
        ) {
          return true;
        }
      }
      return false;
    });
    // only first 12 hours
    relevantHours = relevantHours.slice(0, 12);
    // return [];
    return relevantHours;
  };

  return (
    <AppCard className="px-0">
      <View style={{ height: 14 }} />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={getRelevantHours(props.hours)}
        renderItem={(e) => {
          return <HourColumn hour={e.item} key={e.item.time} />;
        }}
      />
    </AppCard>
  );
};

const HourColumn = (props: { hour: HourlyForcast }) => {
  const getTimeText = () => {
    const now = new Date();
    const hourDate = new Date(props.hour.time);

    if (
      hourDate.getMonth() === now.getMonth() &&
      hourDate.getDate() === now.getDate() &&
      hourDate.getHours() === now.getHours()
    ) {
      return "Now";
    }

    const hours = hourDate.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${formattedHours}${ampm}`;
  };

  return (
    <View className="flex flex-col items-center px-4" style={{ gap: 0 }}>
      <AppText>{props.hour.temp}°</AppText>
      <View className="h-2" />
      <WeatherIconAndDesc
        weatherCode={props.hour.weatherCode}
        hideDesc
        time={props.hour.time}
      />
      <AppText isBold>{getTimeText()}</AppText>
    </View>
  );
};

export default TodayForcast;
