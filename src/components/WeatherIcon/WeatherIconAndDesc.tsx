import { useEffect, useState } from "react";
import { View } from "react-native";
import { SvgUri } from "react-native-svg";

import WeatherIcons from "./WeatherIcons";
import AppText from "../AppText";

interface IWeatherIconProps {
  weatherCode: string;
  time?: string;
  size?: number;
  hideDesc?: boolean;
  hideIcon?: boolean;
  descTextSize?: number;
}
const WeatherIconAndDesc = (props: IWeatherIconProps) => {
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState("");

  const size = props.size || 60;

  useEffect(() => {
    const setIconData = () => {
      if (props.weatherCode in WeatherIcons) {
        // check if night or day
        if (props.time) {
          const hour = new Date(props.time).getHours();
          if (hour >= 18 || hour <= 6) {
            setImage(WeatherIcons[props.weatherCode as any].night.image);
            setDesc(WeatherIcons[props.weatherCode as any].night.description);
            return;
          }
        }
        setImage(WeatherIcons[props.weatherCode as any].day.image);
        setDesc(WeatherIcons[props.weatherCode as any].day.description);
      }
    };

    setIconData();
  }, []);

  const getDescSize = () => {
    if (props.hideIcon) {
      return 16;
    }
    return 10;
  };

  if (!image) {
    return null;
  }

  return (
    <View className="flex flex-col items-center justify-center">
      {!props.hideIcon && (
        <SvgUri
          className="items-center justify-center text-center "
          width={size}
          height={size}
          uri={image}
        />
      )}
      {!props.hideDesc && (
        <AppText style={{ fontSize: getDescSize() }}>{desc}</AppText>
      )}
    </View>
  );
};

export default WeatherIconAndDesc;
