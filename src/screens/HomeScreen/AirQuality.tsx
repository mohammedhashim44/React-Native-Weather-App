import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { View } from "react-native";

import { AppCard } from "../../components/AppCard";
import AppText from "../../components/AppText";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingComponent from "../../components/LoadingComponent";

enum AirQualityDesc {
  Good = "Good",
  Fair = "Fair",
  Moderate = "Moderate",
  Poor = "Poor",
  VeryPoor = "Very Poor",
  ExtremelyPoor = "Extremely Poor",
}

interface AirQualityResponse {
  desc: AirQualityDesc;
  aqi: number;
}

const fetchAirQuality = async (): Promise<AirQualityResponse> => {
  const getDesc = (aqi: number): AirQualityDesc => {
    //Note: The European Air Quality Index (AQI) ranges from 0-20 (good), 20-40 (fair), 40-60 (moderate), 60-80 (poor), 80-100 (very poor) and exceeds 100 for extremely poor conditions.
    if (aqi >= 0 && aqi <= 20) {
      return AirQualityDesc.Good;
    } else if (aqi > 20 && aqi <= 40) {
      return AirQualityDesc.Fair;
    } else if (aqi > 40 && aqi <= 60) {
      return AirQualityDesc.Moderate;
    } else if (aqi > 60 && aqi <= 80) {
      return AirQualityDesc.Poor;
    } else if (aqi > 80 && aqi <= 100) {
      return AirQualityDesc.VeryPoor;
    } else if (aqi > 100) {
      return AirQualityDesc.ExtremelyPoor;
    }
    return AirQualityDesc.Good;
  };
  const url =
    "https://air-quality-api.open-meteo.com/v1/air-quality?latitude=51.7522&longitude=-1.256&hourly=european_aqi";
  const response = await axios.get(url);
  const data = response.data;

  const hours = data.hourly.time;
  const acq = data.hourly.european_aqi;

  // get current hour
  const now = new Date();
  const currentHour = hours.find((dateTime: string) => {
    const date = new Date(dateTime);
    if (
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate() &&
      date.getHours() === now.getHours()
    ) {
      return true;
    }
  });

  const index = hours.indexOf(currentHour);
  const currentAqi = acq[index];
  const desc = getDesc(currentAqi);

  return { aqi: currentAqi, desc };
};

const AirQuality = () => {
  // useMutation
  const { data, isLoading, error, isIdle, mutate } = useMutation(
    ["weatherData"],
    fetchAirQuality,
  );

  useEffect(() => {
    mutate();
  }, []);

  if (isLoading || isIdle) {
    return <LoadingComponent />;
  }
  if (error) {
    return <ErrorComponent message="Error" />;
  }

  return (
    <AppCard>
      <View className="flex flex-row items-center">
        <Ionicons name="md-sunny" size={20} color="white" />
        <View style={{ width: 10 }} />
        <AppText className="text-xl" isBold>
          Air Quality
        </AppText>
      </View>

      <View style={{ height: 10 }} />
      <AppText className="text-2xl ">
        {data?.aqi} - {data?.desc}{" "}
      </AppText>
      <View style={{ height: 5 }} />
      <AppText>Air quality is {data?.aqi}.</AppText>
      <View className="h-8" />
      <QualityIndicator aqi={data!.aqi || 0} />
      <View className="h-4" />
    </AppCard>
  );
};

interface IQualityIndicator {
  aqi: number;
}

const QualityIndicator = (props: IQualityIndicator) => {
  const RECTANGLE_HEIGHT = 5;
  const CIRCLE_RADIUS = 8;

  const getCircleLeft = (): string => {
    const percentage = (props.aqi / 100) * 100;
    return `${percentage}%`;
  };

  return (
    <View>
      <View
        style={{
          width: CIRCLE_RADIUS * 2,
          height: CIRCLE_RADIUS * 2,
          borderRadius: CIRCLE_RADIUS,
          marginLeft: -CIRCLE_RADIUS,
          backgroundColor: "white",
          position: "absolute",
          top: RECTANGLE_HEIGHT / 2 - CIRCLE_RADIUS,
          left: getCircleLeft() as any,
          zIndex: 2,
        }}
      />
      {/* <View className="w-full rounded-full" style={styles.rectangle} /> */}
      <LinearGradient
        className="w-full rounded-full"
        style={{
          height: RECTANGLE_HEIGHT,
        }}
        start={{ x: 0.0, y: 0.0 }}
        colors={["#4792F2", "#65DB7C", "#F5E753", "#E63A52", "#75212D"]}
      />
    </View>
  );
};

export default AirQuality;
