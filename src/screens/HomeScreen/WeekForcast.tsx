import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";

import { AppCard } from "../../components/AppCard";
import AppText from "../../components/AppText";
import HorizontalLine from "../../components/HorizontalLine";
import WeatherIconAndDesc from "../../components/WeatherIcon/WeatherIconAndDesc";
import { DayForcast } from "../../models/WeatherData";

const WeekForcast = (props: { days: DayForcast[] }) => {
  const minimumTemp = props.days.reduce(
    (min, p) => (p.minTemp < min ? p.minTemp : min),
    props.days[0].minTemp,
  );
  const maximumTemp = props.days.reduce(
    (max, p) => (p.maxTemp > max ? p.maxTemp : max),
    props.days[0].maxTemp,
  );

  return (
    <AppCard>
      <View className="flex flex-row items-center">
        <Ionicons name="md-calendar" size={20} color="white" />
        <View style={{ width: 10 }} />
        <AppText isBold>7-DAY FORECAST</AppText>
      </View>
      <View style={{ height: 12 }} />
      <HorizontalLine />

      {props.days.map((day) => {
        return (
          <View key={day.day}>
            <DayRow day={day} weekMax={maximumTemp} weekMin={minimumTemp} />
            <HorizontalLine />
          </View>
        );
      })}
    </AppCard>
  );
};

const DayRow = (props: {
  day: DayForcast;
  weekMin: number;
  weekMax: number;
}) => {
  const formatDate = (dateString: string): string => {
    const checkIfToday = () => {
      const inputDate = new Date(dateString);
      const today = new Date();
      return (
        inputDate.getDate() === today.getDate() &&
        inputDate.getMonth() === today.getMonth() &&
        inputDate.getFullYear() === today.getFullYear()
      );
    };

    if (checkIfToday()) {
      return "Today";
    }

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const dayIndex = new Date(dateString).getDay();
    return days[dayIndex % 7];
  };

  const addDecimal = (num: number) => {
    return num.toFixed(1);
  };

  return (
    <View key={props.day.day}>
      <View style={{ height: 10 }} />
      <View className="flex flex-row py-2 items-center" style={{ gap: 10 }}>
        <AppText className="w-14 text-sm" isBold>
          {formatDate(props.day.day)}
        </AppText>
        <View className="w-12">
          <WeatherIconAndDesc
            size={40}
            weatherCode={props.day.weatherCode}
            hideDesc
          />
        </View>
        <View className="w-10 ">
          <AppText className="text-sm">
            {addDecimal(props.day.minTemp)}°
          </AppText>
        </View>

        <TempratureBar
          min={props.day.minTemp}
          max={props.day.maxTemp}
          weekMin={props.weekMin}
          weekMax={props.weekMax}
        />

        <View className="w-10">
          <AppText className="text-sm">
            {addDecimal(props.day.maxTemp)}°
          </AppText>
        </View>
        {/* <AppText>{props.day.maxTemp}°</AppText> */}
      </View>
      <View style={{ height: 10 }} />
    </View>
  );
};

// TempratureBar
// min,max , weekMin, weekMax
const TempratureBar = (props: {
  min: number;
  max: number;
  weekMin: number;
  weekMax: number;
}) => {
  const calculateWidth = () => {
    // calculate width based on min and max temp
    // relative to the week min and max
    const width =
      ((props.max - props.min) / (props.weekMax - props.weekMin)) * 100;
    return width;
  };

  const calculateLeft = () => {
    // calculate left based on min temp
    // relative to the week min and max
    const left =
      ((props.min - props.weekMin) / (props.weekMax - props.weekMin)) * 100;
    return left;
  };

  return (
    <View
      className="h-2 bg-black rounded-full flex-1"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <LinearGradient
        className="flex-1 rounded-full"
        style={{
          width: `${calculateWidth()}%`,
          left: `${calculateLeft()}%`,
          // left: `${(props.day.minTemp / 50) * 100}%`,
        }}
        start={{ x: 0.0, y: 0.0 }}
        colors={["#96D0A8", "#B5CF79", "#F8D74A", "#EF8835"]}
      />
    </View>
  );
};

export default WeekForcast;
