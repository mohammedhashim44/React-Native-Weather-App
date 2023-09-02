import { MaterialIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { View, ImageBackground, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "../../components/AppText";
import ErrorComponent from "../../components/ErrorComponent";
import LoadingComponent from "../../components/LoadingComponent";
import WeatherIconAndDesc from "../../components/WeatherIcon/WeatherIconAndDesc";
import City from "../../models/City";
import { TodaySummary } from "../../models/WeatherData";
import { apiService } from "../../services/services";
import { favoriteCityIDAtom } from "../../store/store";
import AppColors from "../../theme/Colors";

interface ICityCard {
  city: City;
  onDeleted: Function;
  onMakeFavoriteClicked: Function;
}

const dayAndNightImages = {
  day: require("../../../assets/images/day_card.png"),
  night: require("../../../assets/images/night_card.png"),
};

const CityCard = (props: ICityCard) => {
  const { mutate, data, isLoading, error, isIdle } = useMutation(
    ["citySummary"],
    (cityId: number) => apiService.getCitySummary(cityId),
  );

  useEffect(() => {
    mutate(props.city.id);
  }, []);

  const onContentClicked = () => {
    if (data === undefined) return;
    props.onMakeFavoriteClicked();
  };

  const onDeletedClicked = () => {
    if (data === undefined) return;
    props.onDeleted(props.city.id);
  };

  const isDayTime = () => {
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: props.city.timezone,
      hour: "2-digit",
      hour12: false,
    });
    const hour = parseInt(currentTime);
    return hour >= 6 && hour <= 18;
  };

  const getContent = () => {
    if (isLoading || isIdle) {
      return <LoadingComponent />;
    }

    if (error || data === undefined) {
      return (
        <ErrorComponent
          message="Error Happened"
          tryAgain={() => mutate(props.city.id)}
        />
      );
    }

    return <CityCardContent city={props.city} todaySummary={data} />;
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        renderRightActions={() => (
          <DeleteButton onDeleteClicked={() => onDeletedClicked()} />
        )}
      >
        <TouchableOpacity
          onPress={onContentClicked}
          activeOpacity={0.7}
          className="flex flex-row w-full"
        >
          <View className="w-full px-6">
            <ImageBackground
              className="rounded-full"
              imageStyle={{
                borderRadius: 16,
              }}
              source={dayAndNightImages[isDayTime() ? "day" : "night"]}
            >
              <View className="w-full rounded-3xl p-4">{getContent()}</View>
            </ImageBackground>
          </View>
        </TouchableOpacity>
      </Swipeable>
    </GestureHandlerRootView>
  );
};

const CityCardContent = (props: { city: City; todaySummary: TodaySummary }) => {
  const getTimeText = () => {
    const dateWithTimeZone = new Date().toLocaleString("en-US", {
      timeZone: props.city.timezone,
      hour: "2-digit",
      minute: "2-digit",
    });
    return dateWithTimeZone;
  };

  return (
    <View>
      <View className="flex flex-row justify-between items-start">
        <View className="flex flex-col">
          <CityTitle city={props.city} />
          <AppText className="text-2xl">{getTimeText()}</AppText>
        </View>
        <AppText className="text-2xl">
          {props.todaySummary.currentTemp}C°
        </AppText>
      </View>
      <View className="h-6" />
      <View className="flex flex-row justify-between">
        <View>
          <WeatherIconAndDesc
            weatherCode={props.todaySummary.weatherCode}
            hideIcon
          />
        </View>

        <View className="flex flex-row gap-x-2">
          <AppText>L:{props.todaySummary.minTemp}°</AppText>
          <AppText>H:{props.todaySummary.maxTemp}°</AppText>
        </View>
      </View>
    </View>
  );
};

const DeleteButton = (props: { onDeleteClicked: Function }) => {
  return (
    <TouchableOpacity
      className="items-center justify-center px-4 bg-white  rounded-lg mr-2"
      onPress={() => props.onDeleteClicked()}
    >
      <View className="p-4  items-center justify-center">
        <MaterialIcons name="delete" size={48} color={AppColors.errorColor} />
      </View>
    </TouchableOpacity>
  );
};

const CityTitle = (props: { city: City }) => {
  const [favoriteCityID, _] = useAtom(favoriteCityIDAtom);
  const isFav = favoriteCityID === props.city.id;

  return (
    <View className="flex flex-row items-center">
      <AppText className="text-3xl">{props.city.name}</AppText>
      <View className="w-1" />
      {isFav && <MaterialIcons name="star" size={30} color="gold" />}
    </View>
  );
};

export default CityCard;
